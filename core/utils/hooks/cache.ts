import AsyncStorage from '@react-native-async-storage/async-storage';

export type CacheItem<P, R> = {
  payload: P;
  response: R;
  updateTime: number;
}

export type GetCacheReturnType<R> = Promise<R | null>;
export type SetCacheReturnType<P, R> = Promise<CacheItem<P, R>>;

export type UseCacheResult<P, R> = {
  getCache: () => GetCacheReturnType<R>;
  setCache: (response: R) => SetCacheReturnType<P, R>;
}

const DEFAULT_EXPIRATION_TIME = 60 * 1000;

const getCache = async <P, R>(key: string, payload: P, expirationTime: number): GetCacheReturnType<R> => {
  const data: CacheItem<P, R> = JSON.parse((await AsyncStorage.getItem(key)) as string);

  if (!data) {
    return null;
  }

  if (Number(new Date()) - data.updateTime > expirationTime) {
    await AsyncStorage.removeItem(key);
    return null;
  }

  if (JSON.stringify(payload) !== JSON.stringify(data.payload)) {
    await AsyncStorage.removeItem(key);
    return null;
  }

  return data.response;
};

const setCache = async <P, R>(key: string, payload: P, response: R): SetCacheReturnType<P, R> => {
  const result: CacheItem<P, R> = { payload, response, updateTime: Number(new Date()) };

  await AsyncStorage.setItem(key, JSON.stringify(result));

  return result;
};

export const useCache = <P, R>(key: string, payload: P, expirationTime?: number): UseCacheResult<P, R> => {
  return {
    getCache: () => getCache<P, R>(key, payload, expirationTime ?? DEFAULT_EXPIRATION_TIME),
    setCache: (response: R) => setCache<P, R>(key, payload, response),
  };
}