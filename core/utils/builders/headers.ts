const CONTENT_TYPE = 'application/json';
const ACCEPT = 'application/json';

export type Headers = { [key: string]: string };

export const buildHeaders = (additionalHeaders?: Headers): Headers => {
  return {
    'Content-Type': CONTENT_TYPE,
    'Accept': ACCEPT,
    ...additionalHeaders,
  }
};

buildHeaders.withToken = (token: string, additionalHeaders?: Headers) => {
  return buildHeaders({ ...additionalHeaders, Authorization: `Token ${token}` });
}
