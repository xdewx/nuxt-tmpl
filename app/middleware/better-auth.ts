import { useBetterAuth } from "~/composables/better-auth";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const runtimeConfig = useRuntimeConfig();
  if (!runtimeConfig.betterAuth.enabled) {
    return;
  }

  // console.info("better-auth middleware", to.path, _from.path);
  const { authClient } = useBetterAuth();
  const { data: session } = await authClient.useSession(useFetch);
  if (!session.value && _from.path !== "/") {
    return navigateTo("/");
  }
});
