import { isSafeRoute } from "#shared/utils/route";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const providerId = config.public?.authProvider;
  if (!providerId || providerId === "none") return;

  if (isSafeRoute(event.path)) return;

  if (providerId === "clerk") {
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
  }

  if (providerId === "supabase") {
    const { createServerSupabaseClient } =
      await import("#shared/utils/supabase");
    const supabase = createServerSupabaseClient(event);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) return;

    if (event.path.startsWith("/api/")) {
      throw createError({
        statusCode: 401,
        message: "unauthorized",
        data: { success: false },
      });
    }
    return sendRedirect(event, "/");
  }
});
