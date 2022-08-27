import { DADATA_API_TOKEN as token } from '@env';
import { useApi } from '../../../core/api';
import { buildCache } from '../../../core/utils/builders/cache';
import { buildHeaders } from '../../../core/utils/builders/headers';
import { RegionResponse } from '../types';
import { RegionPayload } from '../types/region-payload';

const BASE_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';
const REGION_KEY = 'current_region';

const EXPIRATION_TIME = 60 * 60 * 1000;

export const getCurrentRegion = async (payload: RegionPayload): Promise<RegionResponse> => {
  return useApi.post<RegionPayload, RegionResponse>(BASE_URL, payload, {
    headers: buildHeaders.withToken(token),
    cache: buildCache(REGION_KEY, payload, EXPIRATION_TIME),
  });
};
