import { createAuthClient } from "better-auth/vue";

const runtimeConfig = useRuntimeConfig();

const authClient = createAuthClient({
  baseURL: runtimeConfig.betterAuth.baseUrl,
});

export const useBetterAuth = () => {
  return {
    authClient,
  };
};
