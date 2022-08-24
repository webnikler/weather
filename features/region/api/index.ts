import { DADATA_API_TOKEN as token } from '@env';
import { useApi } from '../../../core/api';
import { useCache } from '../../../core/utils/hooks/cache';
import { useHeaders } from '../../../core/utils/hooks/headers';
import { RegionResponse } from '../types';
import { RegionPayload } from '../types/region-payload';

const BASE_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';
const REGION_KEY = 'current_region';

const EXPIRATION_TIME = 60 * 60 * 1000;

export const getCurrentRegion = async (payload: RegionPayload): Promise<RegionResponse> => {
  return useApi.post(BASE_URL, payload, {
    usedHeaders: useHeaders.withToken(token),
    usedCache: useCache(REGION_KEY, payload, EXPIRATION_TIME),
  });
};