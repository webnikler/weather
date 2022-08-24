import { ParamsType } from '../types/params';
import { buildUrl } from '../utils/build-url';
import { UseCacheResult } from '../utils/hooks/cache';

export const useApi = async <P extends ParamsType, R>(base: string, payload: P, useCache?: UseCacheResult<P, R>): Promise<R> => {
  const { getCache, setCache } = useCache ?? {};
  const isCacheUsed = typeof getCache === 'function' && typeof setCache === 'function';
  const cache = isCacheUsed && await getCache();

  if (cache) return cache;

  const url = buildUrl(base, payload);

  return fetch(url)
    .then(res => res.json())
    .then(res => isCacheUsed ? setCache(res) : { response: res })
    .then(res => res.response);
};

useApi.get = useApi;

useApi.post = () => {
  throw Error('method not implemented');
};

useApi.put = () => {
  throw Error('method not implemented');
};

useApi.delete = () => {
  throw Error('method not implemented');
};
