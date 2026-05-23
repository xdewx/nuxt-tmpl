import { createServerClient } from '@supabase/ssr'
import { parseCookies, setCookie } from 'h3'
import type { H3Event } from 'h3'

export function createServerSupabaseClient(event: H3Event) {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabase?.url
  const supabaseAnonKey = config.public.supabase?.anonKey

  if (!supabaseUrl || !supabaseAnonKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase URL and anon key must be configured (NUXT_PUBLIC_SUPABASE_URL, NUXT_PUBLIC_SUPABASE_ANON_KEY)',
    })
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return Object.entries(parseCookies(event)).map(([name, value]) => ({ name, value }))
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          setCookie(event, name, value, options)
        })
      },
    },
  })
}
