import { computed } from 'vue'
import { useClerk } from '@clerk/nuxt/composables'
import type { AuthProvider } from './types'
import type { AuthUser, AuthResult } from '#shared/types/auth'

function toUser(u: any): AuthUser | null {
  if (!u) return null
  return {
    id: u.id,
    email: u.primaryEmailAddress?.emailAddress ?? '',
    name: u.fullName ?? u.username ?? '',
    avatarUrl: u.imageUrl ?? null,
    createdAt: u.createdAt,
  }
}

function toResult(result: any): AuthResult {
  if (result?.status) return { success: true as const }
  return {
    success: false as const,
    error: result?.errors?.[0]?.message ?? 'Unknown error',
  }
}

let clerkRef: any = null

function getClerk() {
  if (!clerkRef) {
    const nuxtApp = useNuxtApp()
    clerkRef = nuxtApp.vueApp.runWithContext(() => useClerk())
  }
  return clerkRef?.value
}

export async function createClerkProvider(): Promise<AuthProvider> {
  return {
    id: 'clerk',
    user: computed(() => toUser(getClerk()?.user)),
    isLoaded: computed(() => getClerk()?.loaded ?? false),
    isSignedIn: computed(() => getClerk()?.session != null),

    async signIn(data) {
      return toResult(
        await getClerk()?.client?.signIn?.create({
          identifier: data.email,
          password: data.password,
        }),
      )
    },

    async signUp(data) {
      return toResult(
        await getClerk()?.client?.signUp?.create({
          emailAddress: data.email,
          password: data.password,
        }),
      )
    },

    async signOut() {
      await getClerk()?.signOut()
    },

    async signInWithOAuth(provider) {
      await getClerk()?.openOAuth({ provider })
    },

    openSignIn() {
      return getClerk()?.openSignIn({ mode: 'modal' })
    },

    openSignUp() {
      return getClerk()?.openSignUp({ mode: 'modal' })
    },

    openUserProfile() {
      return getClerk()?.openUserProfile()
    },
  }
}
