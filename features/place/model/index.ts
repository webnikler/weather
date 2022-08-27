import { AddressResponse } from '../types';
export const parseAddressToString = (addressResponse: AddressResponse): string => {
  const data = addressResponse?.suggestions[0]?.data;
  return data && (data.area || data.city || data.region_with_type);
}
