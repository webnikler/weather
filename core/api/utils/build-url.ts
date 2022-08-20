import { ParamsType } from '../types/params';

export const buildUrl = (base: string, params: ParamsType): string => {
  const queryParamsString = buildQueryParamsString(params);

  if (queryParamsString.length) {
    return `${base}?${queryParamsString}`;
  } else {
    return base;
  }
};

const buildQueryParamsString = (params: ParamsType): string => Object.entries(params)
  .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
  .join('&');