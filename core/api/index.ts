import { ParamsType } from '../types/params';
import { buildUrl } from '../utils/build-url';
import { UseCacheResult } from '../utils/hooks/cache';
import { Headers } from '../utils/hooks/headers';

const enum ApiMethod {
  post = 'POST',
  get = 'GET',
  put = 'PUT',
  delete = 'DELETE',
}

type ApiOptions<P, R> = {
  usedCache?: UseCacheResult<P, R>,
  usedHeaders?: Headers;
}

type ApiArguments<P, R> = [string, P, ApiOptions<P, R>];

export const useApi = async <P extends ParamsType, R>(
  method: ApiMethod,
  base: string,
  payload: P,
  options: ApiOptions<P, R>
): Promise<R> => {
  const { getCache, setCache } = options?.usedCache ?? {};
  const cache = getCache && await getCache();
  const headers = options?.usedHeaders ?? {};

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

useApi.get = <P extends ParamsType, R>(...args: ApiArguments<P, R>) => useApi<P, R>(ApiMethod.get, ...args);

useApi.post = <P extends ParamsType, R>(...args: ApiArguments<P, R>) => useApi<P, R>(ApiMethod.post, ...args);

useApi.put = <P extends ParamsType, R>(...args: ApiArguments<P, R>) => useApi<P, R>(ApiMethod.put, ...args);

useApi.delete = <P extends ParamsType, R>(...args: ApiArguments<P, R>) => useApi<P, R>(ApiMethod.delete, ...args);

