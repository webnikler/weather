import AsyncStorage from '@react-native-async-storage/async-storage';

type CacheData<P, R> = {
  payload: P;
  response: R;
  updateTime: number;
}

type UseCacheResult<R> = {
  getCache: () => Promise<R>;
  setCache: (response: R) => Promise<R>;
}

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

const setCache = async <P, R>(key: string, payload: P, response: R) => {
  const result: CacheData<P, R> = { payload, response, updateTime: Number(new Date()) };

  await AsyncStorage.setItem(key, JSON.stringify(result));

  return result;
};

export const useCache = <P, R>(key: string, payload: P, expirationTime?: number): UseCacheResult<R> => {
  const hourInMS = 60 * 60 * 1000;

  return {
    getCache: getCache.bind(null, key, payload, expirationTime ?? hourInMS),
    setCache: setCache.bind(null, key, payload),
  };
}