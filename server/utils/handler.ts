// FIXME: https://github.com/nuxt/nuxt/discussions/34824
import {
  positiveApiResponse,
  negativeApiResponse,
  toApiError,
} from "@ipa-schema/api";

/**
 * use `defineApiHandler` insteadOf `defineEventHandler` to wrap the api handler
 *
 * @param handler the route handler
 * @returns the wrapped route handler
 */
export const defineApiHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      // do something before the route handler
      const response = await handler(event);
      // do something after the route handler
      return positiveApiResponse({
        data: response,
      });
    } catch (err) {
      return negativeApiResponse({
        error: toApiError(err),
      });
    }
  });
