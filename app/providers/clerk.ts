import type { AuthProvider } from './types'
import { positiveApiResponse, negativeApiResponse, toApiError } from "@ipa-schema/api"
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
  if (result?.status) return positiveApiResponse({})
  return negativeApiResponse(toApiError(result?.errors?.[0] ?? 'Unknown error'))
}

function initComposable<T>(fn: () => T): T {
  const nuxtApp = useNuxtApp()
  return nuxtApp.vueApp.runWithContext(fn)
}

export async function createClerkProvider(): Promise<AuthProvider> {
  const { useClerk, useAuth, useUser } = await import('@clerk/nuxt/composables')

  const { isSignedIn, isLoaded, signOut } = initComposable(() => useAuth())
  const { user } = initComposable(() => useUser())
  const clerkRef = initComposable(() => useClerk())

  return {
    id: 'clerk',
    user: computed(() => toUser(user.value)),
    isLoaded: computed(() => isLoaded.value),
    isSignedIn: computed(() => isSignedIn.value ?? false),

    async signIn(data) {
      return toResult(
        await clerkRef.value?.client?.signIn?.create({
          identifier: data.email,
          password: data.password,
        }),
      )
    },

    async signUp(data) {
      return toResult(
        await clerkRef.value?.client?.signUp?.create({
          emailAddress: data.email,
          password: data.password,
        }),
      )
    },

    async signOut() {
      await signOut.value()
    },

    async signInWithOAuth(_provider) {
      return clerkRef.value?.openSignIn()
    },

    async openSignIn() {
      return clerkRef.value?.openSignIn()
    },

    async openSignUp() {
      return clerkRef.value?.openSignUp()
    },

    async openUserProfile() {
      return clerkRef.value?.openUserProfile()
    },
  }
}
