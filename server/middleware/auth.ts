export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  if (runtimeConfig.betterAuth.enabled || runtimeConfig.clerk.enabled) {
    return;
  }
  console.debug("No auth enabled");
});
