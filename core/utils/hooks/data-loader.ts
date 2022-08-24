import { useEffect, useState } from 'react';

export type DataLoaderResult<D> = {
  loading: boolean;
  error: Error;
  data: D;
}

export const useDataLoader = <R>(asyncFn: () => Promise<R>, depends: any[] = []): DataLoaderResult<R> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    asyncFn()
      .then(d => setData(d))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, depends);

  return {
    loading,
    error,
    data
  };
};
