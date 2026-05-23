import { createAuthClient } from "better-auth/vue";
import type { AuthProvider } from "./types";
import type {
  AuthUser,
  AuthResult,
  AuthSignInData,
  AuthSignUpData,
} from "#shared/types/auth";

export function createBetterAuthProvider(): AuthProvider {
  const config = useRuntimeConfig();
  const baseURL = config.public.betterAuth?.baseUrl || config.public.baseUrl || "";
  const client = createAuthClient({ baseURL });

  const sessionRef = client.useSession();
  const sessionData = computed(() => sessionRef.value.data ?? null);
  const isPending = computed(() => sessionRef.value.isPending ?? true);

  const user = computed<AuthUser | null>(() => {
    const s = sessionData.value;
    if (!s?.user) return null;
    const u = s.user;
    return {
      id: u.id,
      email: u.email,
      name: (u as any).name ?? "",
      avatarUrl: (u as any).image ?? null,
      createdAt: new Date((u as any).createdAt ?? Date.now()),
    };
  });

  const isLoaded = computed(() => !isPending.value);
  const isSignedIn = computed(() => !!sessionData.value);

  return {
    id: "better-auth",
    user,
    isLoaded,
    isSignedIn,

    async signIn(data: AuthSignInData): Promise<AuthResult> {
      const { error } = await client.signIn.email(data);
      if (error)
        return {
          success: false as const,
          error: error.message ?? "Unknown error",
        };
      return { success: true as const };
    },

    async signUp(data: AuthSignUpData): Promise<AuthResult> {
      const { error } = await client.signUp.email({
        ...data,
        name: data.name ?? "",
      });
      if (error)
        return {
          success: false as const,
          error: error.message ?? "Unknown error",
        };
      return { success: true as const };
    },

    async signOut(): Promise<void> {
      await client.signOut();
    },

    async signInWithOAuth(provider: string): Promise<void> {
      await client.signIn.social({ provider });
    },

    openSignIn: async () => { await navigateTo("/sign-in") },
    openSignUp: async () => { await navigateTo("/sign-up") },
    openUserProfile: async () => { await navigateTo("/profile") },
  };
}

