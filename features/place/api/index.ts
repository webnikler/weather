import { api } from '@app/api';
import { buildCache } from '@app/builders/cache';
import { buildHeaders } from '@app/builders/headers';
import { DADATA_API_TOKEN as token } from '@env';

import { AddressPayload, AddressResponse } from '../types';

const ADDRESS_BASE_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';
const ADDRESS_COORDINATES_KEY = 'address';

const EXPIRATION_TIME = 60 * 60 * 1000;

export const getAddressByCoordinates = async (
  payload: AddressPayload
): Promise<AddressResponse> => {
  return api.post<AddressPayload, AddressResponse>(ADDRESS_BASE_URL, payload, {
    headers: buildHeaders.withToken(token),
    cache: buildCache(ADDRESS_COORDINATES_KEY, payload, EXPIRATION_TIME),
  });
};
