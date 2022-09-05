import { CacheInstance } from '@app/builders/cache';
import { Headers } from '@app/builders/headers';
import { buildUrl } from '@app/builders/url';

const enum ApiMethod {
  post = 'POST',
  get = 'GET',
  put = 'PUT',
  delete = 'DELETE',
}

type ApiOptions<P, R> = {
  cache?: CacheInstance<P, R>;
  headers?: Headers;
};

type ApiArguments<P, R> = [string, P, ApiOptions<P, R>];

const handleApiError = async (response: Response): Promise<Response> => {
  if (response.ok) {
    return response;
  }

  const res = await response.json();
  const message = res?.message ?? `Api error with status code ${response.status}`;

  throw Error(message);
};

export const api = async <P extends object, R>(
  method: ApiMethod,
  base: string,
  payload: P,
  options: ApiOptions<P, R>
): Promise<R> => {
  const { getCache, setCache } = options?.cache ?? {};
  const cache = await getCache?.();
  const headers = options?.headers ?? {};

  let url: string = base,
    body = null;

  if (cache) return cache;

  switch (method) {
    case ApiMethod.get:
    case ApiMethod.delete:
      url = buildUrl(base, payload);
      break;
    case ApiMethod.post:
    case ApiMethod.put:
      body = JSON.stringify(payload);
      break;
  }

  return fetch(url, { method, body, headers })
    .then((res) => handleApiError(res))
    .then((res) => res.json())
    .then(async (res) => (setCache ? (await setCache(res)).response : res));
};

api.get = <P extends object, R>(...args: ApiArguments<P, R>) => api<P, R>(ApiMethod.get, ...args);

api.post = <P extends object, R>(...args: ApiArguments<P, R>) => api<P, R>(ApiMethod.post, ...args);

api.put = <P extends object, R>(...args: ApiArguments<P, R>) => api<P, R>(ApiMethod.put, ...args);

api.delete = <P extends object, R>(...args: ApiArguments<P, R>) =>
  api<P, R>(ApiMethod.delete, ...args);
