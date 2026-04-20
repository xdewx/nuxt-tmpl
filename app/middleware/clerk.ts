import { useAuth } from "@clerk/nuxt/composables";
import { watch } from "vue";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const runtimeConfig = useRuntimeConfig();
  if (!runtimeConfig.clerk.enabled) {
    // console.info("clerk middleware disabled");
    return;
  }

  // console.info("clerk middleware", to.path, _from.path);
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded.value) {
    await new Promise((resolve) => {
      const stop = watch(
        () => isLoaded.value,
        (loaded) => {
          if (loaded) {
            stop();
            resolve(undefined);
          }
        },
        { immediate: true },
      );
    });
  }

  // 允许访问登录和注册页面及其所有子路径
  const publicRoutes = ["/sign-in", "/sign-up", "/"];
  if (
    publicRoutes.some(
      (route) => to.path === route || to.path.startsWith(`${route}/`),
    )
  ) {
    return;
  }
  // 检查用户是否已登录
  if (!isSignedIn.value && _from.path !== "/") {
    return navigateTo("/");
  }
});
