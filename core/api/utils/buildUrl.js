export const buildUrl = (base, params) => {
  const queryParamsString = buildQueryParamsString(params);

  if (queryParamsString.length) {
    return `${base}?${queryParamsString}`;
  } else {
    return base;
  }
};

const buildQueryParamsString = params => Object.entries(params)
  .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
  .join('&');