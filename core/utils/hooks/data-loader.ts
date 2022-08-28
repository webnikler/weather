import { useEffect, useReducer } from 'react';

type DataLoaderData<D> = D | null;
type DataLoaderError = Error | null;

export type DataLoaderResult<R> = [boolean, DataLoaderData<R>, DataLoaderError];

export type DataLoaderState<D> = {
  loading: boolean;
  data: D | null;
  error: Error | null;
};

export type DataLoaderOptions = {
  skipEffect?: boolean;
};

export const useDataLoader = <R>(
  asyncFn: () => Promise<R>,
  depends: any[] = [],
  options?: DataLoaderOptions
): DataLoaderResult<R> => {
  const reducer = (
    state: DataLoaderState<R>,
    newState: Partial<DataLoaderState<R>>
  ): DataLoaderState<R> => {
    return { ...state, ...newState };
  };

  const initialState: DataLoaderState<R> = {
    loading: !options?.skipEffect,
    data: null,
    error: null,
  };

  const [{ loading, data, error }, dispatch] = useReducer(reducer, initialState);

  const load = () => {
    if (options?.skipEffect) return;

    dispatch({ loading: true });

    asyncFn()
      .then((data) => dispatch({ loading: false, data }))
      .catch((error) => dispatch({ loading: false, error }));
  };

  useEffect(() => load(), depends);

  return [loading, data, error];
};
