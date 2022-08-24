import { WEATHER_API_TOKEN } from '@env';
import { useApi } from '../../../core/api';
import { useCache } from '../../../core/utils/hooks/cache';
import { DaysForecastPayload, ForecastPayload, ForecastResponse } from '../types';

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata';
const FORECAST_URL = `${BASE_URL}/forecast`;
const FORECAST_DAY_KEY = 'WEATHER_FORECAST_DAY';
const FORECAST_WEEK_KEY = 'WEATHER_FORECAST_WEEK';
const FORECAST_CONTENT_TYPE = 'json';
const FORECAST_LOCATION_MODE = 'single';
const FORECAST_ICONSET = 'icons1';

const EXPIRATION_TIME = 60 * 60 * 1000;

export const getForecast = async (payload: ForecastPayload, key: string): Promise<ForecastResponse> => {
  const fullPayload = {
    ...payload,
    key: WEATHER_API_TOKEN,
    contentType: FORECAST_CONTENT_TYPE,
    locationMode: FORECAST_LOCATION_MODE,
    iconSet: FORECAST_ICONSET,
  };

  return useApi.get(FORECAST_URL, fullPayload, {
    usedCache: useCache(key, payload, EXPIRATION_TIME),
  });
}

getForecast.day = async (payload: DaysForecastPayload): Promise<ForecastResponse> => {
  const fullPayload = {
    ...payload,
    aggregateHours: 1,
    forecastDays: 1,
  };

  return getForecast(fullPayload, FORECAST_DAY_KEY);
};

getForecast.week = async (payload: DaysForecastPayload): Promise<ForecastResponse> => {
  const fullPayload = {
    ...payload,
    aggregateHours: 24,
    forecastDays: 7,
  };

  return getForecast(fullPayload, FORECAST_WEEK_KEY);
};
