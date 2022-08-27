import { AddressResponse } from '../types';
export const parseAddressToString = (addressResponse: AddressResponse): string => {
  return addressResponse?.suggestions[0]?.data?.area;
}
