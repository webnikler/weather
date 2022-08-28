export const buildUrl = (base: string, params: object): string => {
  const queryParamsString = buildQueryParamsString(params);

  if (queryParamsString.length) {
    return `${base}?${queryParamsString}`;
  } else {
    return base;
  }
};

const buildQueryParamsString = <P>(params: P): string =>
  Object.entries(params)
    .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
    .join('&');
