import type { AuthProvider } from './types'

declare const __AUTH_PROVIDER__: string | undefined;

function resolveAuthProvider(): string {
  if (typeof __AUTH_PROVIDER__ !== "undefined" && __AUTH_PROVIDER__) {
    return __AUTH_PROVIDER__;
  }
  const config = useRuntimeConfig();
  return (
    config.public?.authProvider || (config.public as any)?.auth?.provider || ""
  );
}

export async function createAuthProvider(): Promise<AuthProvider> {
  const provider = resolveAuthProvider();

  console.log(provider);

  try {
    if (provider === "clerk") {
      const { createClerkProvider } = await import("./clerk");
      return createClerkProvider();
    }

    if (provider === "better-auth") {
      const { createBetterAuthProvider } = await import("./better-auth");
      return createBetterAuthProvider();
    }

    if (provider === "supabase") {
      const { createSupabaseProvider } = await import("./supabase");
      return createSupabaseProvider();
    }
  } catch (e) {
    console.error(`Failed to initialize auth provider "${provider}":`, e);
  }

  return createNoopProvider();
}

function createNoopProvider(): AuthProvider {
  return {
    id: 'none',
    user: ref(null),
    isLoaded: ref(true),
    isSignedIn: ref(false),

    async signIn() {
      return { success: false, error: 'No auth provider enabled' }
    },

    async signUp() {
      return { success: false, error: 'No auth provider enabled' }
    },

    async signOut() {},

    async signInWithOAuth() {},
  }
}
