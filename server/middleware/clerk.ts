import { isSafeRoute } from "#shared/utils/route";
import { clerkMiddleware } from "@clerk/nuxt/server";
export default clerkMiddleware((event) => {
  const runtimeConfig = useRuntimeConfig();
  if (!runtimeConfig.clerk.enabled) {
    console.debug("clerk not enabled");
    return;
  }
  if (isSafeRoute(event.path)) {
    return;
  }
  const { isAuthenticated, userId } = event.context.auth();
  console.log("isAuthenticated", isAuthenticated, userId, event.path);
  if (isAuthenticated) {
    return;
  }

  if (event.path.startsWith("/api")) {
    event.node.res.end(
      JSON.stringify({
        success: false,
        error: { code: 401, message: "unauthorized" },
      }),
    );
    return;
  }
  throw createError({
    statusCode: 401,
    message: "unauthorized",
  });
});
