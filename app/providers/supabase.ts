import { createBrowserClient } from '@supabase/ssr'
import type { Provider } from '@supabase/supabase-js'
import type { AuthProvider } from './types'
import type { AuthUser, AuthResult, AuthSignInData, AuthSignUpData } from '#shared/types/auth'

export function toUser(sbUser: any): AuthUser | null {
  if (!sbUser) return null
  return {
    id: sbUser.id,
    email: sbUser.email ?? '',
    name: sbUser.user_metadata?.name ?? sbUser.user_metadata?.full_name ?? '',
    avatarUrl: sbUser.user_metadata?.avatar_url ?? sbUser.user_metadata?.picture ?? null,
    createdAt: new Date(sbUser.created_at),
  }
}

export function createSupabaseProvider(): AuthProvider {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabase?.url
  const supabaseAnonKey = config.public.supabase?.anonKey

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NUXT_PUBLIC_SUPABASE_URL or NUXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

  const user = ref<AuthUser | null>(null)
  const isLoaded = ref(false)
  const isSignedIn = computed(() => !!user.value)

  supabase.auth.getSession().then(({ data: { session } }) => {
    user.value = toUser(session?.user ?? null)
    isLoaded.value = true
  })

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = toUser(session?.user ?? null)
    isLoaded.value = true
  })

  return {
    id: 'supabase',
    user,
    isLoaded,
    isSignedIn,

    async signIn(data: AuthSignInData): Promise<AuthResult> {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      if (error) return { success: false, error: error.message }
      return { success: true }
    },

    async signUp(data: AuthSignUpData): Promise<AuthResult> {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { name: data.name } },
      })
      if (error) return { success: false, error: error.message }
      return { success: true }
    },

    async signOut(): Promise<void> {
      await supabase.auth.signOut()
    },

    async signInWithOAuth(provider: string): Promise<void> {
      await supabase.auth.signInWithOAuth({ provider: provider as Provider })
    },

    openSignIn: async () => { await navigateTo('/sign-in') },
    openSignUp: async () => { await navigateTo('/sign-up') },
    openUserProfile: async () => { await navigateTo('/profile') },
  }
}
