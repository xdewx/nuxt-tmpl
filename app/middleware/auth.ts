import { isSafeRoute } from "#shared/utils/route";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const config = useRuntimeConfig();
  const providerId =
    config.public?.authProvider || (config.public as any)?.auth?.provider;
  if (!providerId || providerId === "none") return;

  const { $auth } = useNuxtApp();

  if (!$auth.isLoaded.value) {
    await new Promise<void>((resolve) => {
      const stop = watch(
        () => $auth.isLoaded.value,
        (loaded) => {
          if (loaded) {
            stop();
            resolve();
          }
        },
        { immediate: true },
      );
    });
  }

  if (isSafeRoute(to.path)) return;

  if (!$auth.isSignedIn.value && _from.path !== "/") {
    return navigateTo("/");
  }
});

