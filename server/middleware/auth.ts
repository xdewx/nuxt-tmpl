import { isSafeRoute } from "#shared/utils/route";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const providerId = config.public?.authProvider;
  if (providerId !== "clerk") return;

  if (isSafeRoute(event.path)) return;

  try {
    const { clerkMiddleware } = await import("@clerk/nuxt/server");
    return clerkMiddleware((event) => {
      const auth = event.context.auth();
      if (auth?.isAuthenticated) return;

      if (event.path.startsWith("/api/")) {
        throw createError({
          statusCode: 401,
          message: "unauthorized",
          data: { success: false },
        });
      }
      return sendRedirect(event, "/");
    })(event);
  } catch {
    // Clerk module not available
  }
});
