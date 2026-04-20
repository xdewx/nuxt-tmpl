import type { ApiResponse } from "@ipa-schema/api";

const isApiPath = (path: string | undefined) =>
  typeof path === "string" && path.startsWith("/api/");

const parseJsonIfNeeded = (
  body: unknown,
  contentType?: string | null,
): unknown => {
  if (typeof body !== "string") return body;
  if (!contentType?.includes("application/json")) return body;

  const trimmed = body.trim();
  if (!trimmed || (trimmed[0] !== "{" && trimmed[0] !== "[")) {
    return body;
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    return body;
  }
};

const isAlreadyWrappedResponse = (
  body: unknown,
): body is ApiResponse<unknown> => {
  return body !== null && typeof body === "object" && "success" in body;
};

/**
 * @deprecated use `defineApiHandler` instead
 */
const _apiResponseWrapper = defineEventHandler((event) => {
  if (!isApiPath(event.path)) return;

  const res = event.node.res;
  const originalEnd = res.end.bind(res);

  res.end = function (chunk?: any, encoding?: any, cb?: any) {
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = undefined;
      encoding = undefined;
    }

    let body = chunk;
    if (Buffer.isBuffer(body)) {
      body = body.toString("utf8");
    }

    const contentType = res.getHeader("content-type");
    body = parseJsonIfNeeded(body, contentType as string | null);

    if (isAlreadyWrappedResponse(body)) {
      return originalEnd(chunk, encoding, cb);
    }

    const wrappedBody: ApiResponse<any> = {
      data: body,
      success: true,
    };

    res.setHeader("content-type", "application/json; charset=utf-8");
    return originalEnd(JSON.stringify(wrappedBody), encoding, cb);
  };
});

/**
 * TODO: the middleware in nuxt seems different from other backend frameworks
 */
export default eventHandler({
  onRequest: [],
  onBeforeResponse: [],
  handler: () => {},
});