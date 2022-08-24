import AsyncStorage from '@react-native-async-storage/async-storage';

type CacheData<P, R> = {
  payload: P;
  response: R;
  updateTime: number;
}

type UseCacheResult<P, R> = {
  getCache: () => Promise<R>;
  setCache: (response: R) => Promise<CacheData<P, R>>;
}

const DEFAULT_EXPIRATION_TIME = 60 * 1000;

const getCache = async <P, R>(key: string, payload: P, expirationTime: number): Promise<R> => {
  const data: CacheData<P, R> = JSON.parse(await AsyncStorage.getItem(key));

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

const setCache = async <P, R>(key: string, payload: P, response: R): Promise<CacheData<P, R>> => {
  const result: CacheData<P, R> = { payload, response, updateTime: Number(new Date()) };

  await AsyncStorage.setItem(key, JSON.stringify(result));

  return result;
};

export const useCache = <P, R>(key: string, payload: P, expirationTime?: number): UseCacheResult<P, R> => {
  return {
    getCache: getCache.bind(null, key, payload, expirationTime ?? DEFAULT_EXPIRATION_TIME),
    setCache: setCache.bind(null, key, payload),
  };
}