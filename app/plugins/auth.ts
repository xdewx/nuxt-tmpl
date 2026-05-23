import { createAuthProvider } from "~/providers";

export default defineNuxtPlugin(async () => {
  const auth = await createAuthProvider();
  return {
    provide: {
      // will be nuxtApp.$auth
      auth,
    },
  };
});
