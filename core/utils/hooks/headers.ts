const CONTENT_TYPE = 'application/json';
const ACCEPT = 'application/json';

export type Headers = { [key: string]: string };

export const useHeaders = (additionalHeaders?: Headers): Headers => {
  return {
    'Content-Type': CONTENT_TYPE,
    'Accept': ACCEPT,
    ...additionalHeaders,
  }
};

useHeaders.withToken = (token: string, additionalHeaders?: Headers) => {
  return useHeaders({ ...additionalHeaders, Authorization: `Token ${token}` });
}