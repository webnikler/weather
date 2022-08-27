import { buildUrl } from '../utils/builders/url';
import { Headers } from '../utils/builders/headers';
import { CacheInstance } from '../utils/builders/cache';

const enum ApiMethod {
  post = 'POST',
  get = 'GET',
  put = 'PUT',
  delete = 'DELETE',
}

type ApiOptions<P, R> = {
  cache?: CacheInstance<P, R>,
  headers?: Headers;
}

type ApiArguments<P, R> = [string, P, ApiOptions<P, R>];

export const useApi = async <P extends object, R>(
  method: ApiMethod,
  base: string,
  payload: P,
  options: ApiOptions<P, R>
): Promise<R> => {
  const { getCache, setCache } = options?.cache ?? {};
  const cache = getCache && await getCache();
  const headers = options?.headers ?? {};

  let url: string = base, body = null;

  if (cache) return cache;

  switch (method) {
    case ApiMethod.get: case ApiMethod.delete:
      url = buildUrl(base, payload);
      break;
    case ApiMethod.post: case ApiMethod.put:
      body = JSON.stringify(payload);
      break;
  }

  return fetch(url, { method, body, headers })
    .then(res => res.json())
    .then(res => setCache ? setCache(res) : { response: res })
    .then(res => res.response);
};

useApi.get = <P extends object, R>(...args: ApiArguments<P, R>) => useApi<P, R>(ApiMethod.get, ...args);

useApi.post = <P extends object, R>(...args: ApiArguments<P, R>) => useApi<P, R>(ApiMethod.post, ...args);

useApi.put = <P extends object, R>(...args: ApiArguments<P, R>) => useApi<P, R>(ApiMethod.put, ...args);

useApi.delete = <P extends object, R>(...args: ApiArguments<P, R>) => useApi<P, R>(ApiMethod.delete, ...args);

