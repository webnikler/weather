import { API_KEY } from '@env'
import { useCache } from './cache/cache';
import { DaysForecastPayload, ForecastPayload } from './types/forecast-payload';
import { ForecastResponse } from './types/forecast-response';
import { buildUrl } from './utils/build-url';

const WEATHER_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata';
const WEATHER_FORECAST_URL = `${WEATHER_BASE_URL}/forecast`;

const WEATHER_FOR_CURRENT_DAY_KEY = 'WEATHER_FOR_CURRENT_DAY';
const WEATHER_FOR_7_DAYS_KEY = 'WEATHER_FOR_7_DAYS';

export const getForecast = async (payload: ForecastPayload, key: string): Promise<ForecastResponse> => {
  const { getCache, setCache } = useCache<ForecastPayload, ForecastResponse>(key, payload);
  const cache = await getCache();

  if (cache) return cache;

  const { locations, aggregateHours, forecastDays, unitGroup, lang } = payload;
  const contentType = 'json';
  const locationMode = 'single';
  const iconSet = 'icons1';

  const url = buildUrl(WEATHER_FORECAST_URL, {
    locations,
    aggregateHours,
    forecastDays,
    unitGroup,
    lang,
    contentType,
    locationMode,
    iconSet,
    key: API_KEY,
  });

  return fetch(url)
    .then(res => res.json())
    .then(res => setCache(res));
}

getForecast.forCurrent = async (payload: DaysForecastPayload): Promise<ForecastResponse> => {
  const aggregateHours = 1;
  const forecastDays = 1;

  return getForecast({
    ...payload,
    aggregateHours,
    forecastDays,
  }, WEATHER_FOR_CURRENT_DAY_KEY);
};

getForecast.for7Days = async (payload: DaysForecastPayload): Promise<ForecastResponse> => {
  const aggregateHours = 24;
  const forecastDays = 7;

  return getForecast({
    ...payload,
    aggregateHours,
    forecastDays,
  }, WEATHER_FOR_7_DAYS_KEY);
};
