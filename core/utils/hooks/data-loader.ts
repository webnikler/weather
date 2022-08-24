import { useEffect, useState } from 'react';

export type DataLoaderResult<D> = [D, boolean, Error];

export type DataLoaderOptions = {
  skipEffect?: boolean;
}

export const useDataLoader = <R>(
  asyncFn: () => Promise<R>,
  depends: any[] = [],
  options?: DataLoaderOptions
): DataLoaderResult<R> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (options?.skipEffect) return;

    setLoading(true);
    asyncFn()
      .then(d => setData(d))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, depends);

  return [data, loading, error];
};
