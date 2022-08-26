import { useEffect, useReducer } from 'react';

export type DataLoaderResult<R> = [boolean, R, Error];

export type DataLoaderOptions = {
  skipEffect?: boolean;
}

export type DataLoaderState<D> = {
  loading: boolean;
  data: D;
  error: Error;
}

export const useDataLoader = <R>(
  asyncFn: () => Promise<R>,
  depends: any[] = [],
  options?: DataLoaderOptions
): DataLoaderResult<R> => {

  const reducer = (
    state: DataLoaderState<R>,
    newState: Partial<DataLoaderState<R>>
  ) => ({
    ...state,
    ...newState
  });

  const initialState = {
    loading: !options?.skipEffect,
    data: null,
    error: null,
  };

  const [{ loading, data, error }, dispatch] = useReducer(reducer, initialState);

  const load = () => {
    if (options?.skipEffect) return;

    dispatch({ loading: true });

    asyncFn()
      .then(data => dispatch({ loading: false, data }))
      .catch(error => dispatch({ loading: false, error }));
  }

  useEffect(() => load(), depends);

  return [loading, data, error];
};
