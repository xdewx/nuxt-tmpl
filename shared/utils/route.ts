/**
 * 是否是安全路由
 * @param path 路径
 * @returns 是否是安全路由
 */
export function isSafeRoute(path: string) {
  if (path?.startsWith("/__nuxt_error?")) {
    return true;
  }
  const publicRoutes = ["/sign-in", "/sign-up", "/", "/__nuxt_error"];
  return publicRoutes.some(
    (route) => path === route || path?.includes(`${route}/`),
  );
}
