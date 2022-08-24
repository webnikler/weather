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

export const useApi = async <P extends ParamsType, R>(
  method: ApiMethod,
  base: string,
  payload: P,
  options: ApiOptions<P, R>
): Promise<R> => {
  const { getCache, setCache } = options?.usedCache ?? {};
  const isCacheUsed = typeof getCache === 'function' && typeof setCache === 'function';
  const cache = isCacheUsed && await getCache();
  const headers = options?.usedHeaders ?? {};

  let url: string, body: string;

  if (cache) return cache;

  switch (method) {
    case ApiMethod.get: case ApiMethod.delete:
      url = buildUrl(base, payload);
      break;
    case ApiMethod.post: case ApiMethod.put:
      url = base;
      body = JSON.stringify(payload);
      break;
  }

  return fetch(url, { method, body, headers })
    .then(res => res.json())
    .then(res => isCacheUsed ? setCache(res) : { response: res })
    .then(res => res.response);
};

useApi.get = useApi.bind(null, ApiMethod.get);

useApi.post = useApi.bind(null, ApiMethod.post);

useApi.put = useApi.bind(null, ApiMethod.put);

useApi.delete = useApi.bind(null, ApiMethod.delete);
