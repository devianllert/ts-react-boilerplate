import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
} from 'axios';

export interface AxiosAuthRefreshOptions {
  statusCodes?: number[];
  retryInstance?: AxiosInstance;
  skipWhileRefreshing?: boolean;
  onRetry?: (requestConfig: AxiosRequestConfig) => AxiosRequestConfig;
}

export interface AxiosAuthRefreshCache {
  skipInstances: AxiosInstance[];
  refreshCall: Promise<any> | undefined;
  requestQueueInterceptorId: number | undefined;
}

export const defaultOptions: AxiosAuthRefreshOptions = {
  statusCodes: [401],
  skipWhileRefreshing: true,
};

const axiosCache: AxiosAuthRefreshCache = {
  skipInstances: [],
  refreshCall: undefined,
  requestQueueInterceptorId: undefined,
};

/**
 * Returns TRUE: when error.response.status is contained in options.statusCodes
 * Returns FALSE: when error or error.response doesn't exist or options.statusCodes doesn't include response status
 */
function shouldInterceptError(error: any, options: AxiosAuthRefreshOptions, instance: AxiosInstance): boolean {
  if (!error) {
    return false;
  }

  if (error.config && error.config.skipAuthRefresh) {
    return false;
  }

  if (!error.response || !options.statusCodes?.includes(parseInt(error.response.status, 10))) {
    return false;
  }

  return !options.skipWhileRefreshing || !axiosCache.skipInstances.includes(instance);
}

/**
 * Creates refresh call if it does not exist or returns the existing one.
 */
export function createRefreshCall(error: any, fn: (error: any) => Promise<any>): Promise<any> {
  if (!axiosCache.refreshCall) {
    axiosCache.refreshCall = fn(error);

    if (typeof axiosCache.refreshCall.then !== 'function') {
      console.warn('axios-auth-refresh requires `refreshTokenCall` to return a promise.');

      return Promise.reject();
    }
  }

  return axiosCache.refreshCall;
}

/**
 * Creates request queue interceptor if it does not exist and returns its id.
 */
export function createRequestQueueInterceptor(instance: AxiosInstance, options: AxiosAuthRefreshOptions): number {
  if (!axiosCache.requestQueueInterceptorId) {
    axiosCache.requestQueueInterceptorId = instance.interceptors.request.use((request) => {
      if (!axiosCache.refreshCall) return Promise.reject();

      return axiosCache.refreshCall
        .then(() => (options.onRetry ? options.onRetry(request) : request))
        .catch(() => {
          throw new axios.Cancel('Request call failed');
        });
    });
  }

  return axiosCache.requestQueueInterceptorId;
}

/**
 * Ejects request queue interceptor and unset interceptor cached values.
 */
export function unsetCache(instance: AxiosInstance): void {
  if (!axiosCache.requestQueueInterceptorId) return;

  instance.interceptors.request.eject(axiosCache.requestQueueInterceptorId);

  axiosCache.requestQueueInterceptorId = undefined;
  axiosCache.refreshCall = undefined;

  axiosCache.skipInstances = axiosCache.skipInstances.filter((skipInstance) => skipInstance !== instance);
}

/**
 * Returns instance that's going to be used when requests are retried
 */
export function getRetryInstance(instance: AxiosInstance, options: AxiosAuthRefreshOptions): AxiosInstance {
  return options.retryInstance || instance;
}

/**
 * Resend failed axios request.
 */
export function resendFailedRequest(error: any, instance: AxiosInstance): AxiosPromise {
  // eslint-disable-next-line no-param-reassign
  error.config.skipAuthRefresh = true;

  return instance(error.response.config);
}

/**
 * Creates an authentication refresh interceptor that binds to any error response.
 * If the response status code is one of the options.statusCodes, interceptor calls the refreshAuthCall
 * which must return a Promise. While refreshAuthCall is running, all the new requests are intercepted and are waiting
 * for the refresh call to resolve. While running the refreshing call, instance provided is marked as a paused instance
 * which indicates the interceptor to not intercept any responses from it. This is because you'd otherwise need to mark
 * the specific requests you make by yourself in order to make sure it's not intercepted. This behavior can be
 * turned off, but use it with caution as you need to mark the requests with `skipAuthRefresh` flag yourself in order to
 * not run into interceptors loop.
 *
 * @param {AxiosInstance} instance - Axios HTTP client instance
 * @param {(error: any) => Promise<AxiosPromise>} refreshAuthCall - refresh token call which must return a Promise
 * @param {AxiosAuthRefreshOptions} options - options for the interceptor @see defaultOptions
 * @return {number} - interceptor id (in case you want to eject it manually)
 */
export default function createAuthRefreshInterceptor(
  instance: AxiosInstance,
  refreshAuthCall: (error: any) => Promise<any>,
  options: AxiosAuthRefreshOptions = {},
): number {
  return instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: any) => {
      const mergedOptions = { ...defaultOptions, ...options };

      if (!shouldInterceptError(error, mergedOptions, instance)) {
        return Promise.reject(error);
      }

      axiosCache.skipInstances.push(instance);

      // If refresh call does not exist, create one
      const refreshing = createRefreshCall(error, refreshAuthCall);

      // Create interceptor that will bind all the others requests until refreshAuthCall is resolved
      createRequestQueueInterceptor(instance, mergedOptions);

      return refreshing
        .then(() => resendFailedRequest(error, getRetryInstance(instance, mergedOptions)))
        .catch((err) => Promise.reject(err))
        .finally(() => unsetCache(instance));
    },
  );
}