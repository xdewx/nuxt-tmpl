import { auth } from "#shared/utils/better-auth";

export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  const provider =
    runtimeConfig.public?.authProvider ||
    (runtimeConfig.public as any)?.auth?.provider;
  if (provider !== "better-auth") {
    return;
  }
  return auth.handler(toWebRequest(event));
});

