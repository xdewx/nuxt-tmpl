import type { AuthProvider } from "~/providers/types";

export function useAuth(): AuthProvider {
  const nuxtApp = useNuxtApp();
  // console.log(nuxtApp.$auth);
  return nuxtApp.$auth as AuthProvider;
}
