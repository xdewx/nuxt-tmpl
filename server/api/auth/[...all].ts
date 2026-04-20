import { auth } from "#shared/utils/better-auth";

export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  if (!runtimeConfig.betterAuth.enabled) {
    return;
  }
  return auth.handler(toWebRequest(event));
});
