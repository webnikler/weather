import { API_KEY } from '@env'
import { DaysForecastPayload, ForecastPayload } from './types/forecast-payload';
import { ForecastResponse } from './types/forecast-response';
import { buildUrl } from './utils/build-url';

const WEATHER_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata';
const WEATHER_FORECAST_URL = `${WEATHER_BASE_URL}/forecast`;

export const getForecast = async ({
  locations,
  aggregateHours,
  forecastDays,
  unitGroup,
  lang,
}: ForecastPayload): Promise<ForecastResponse> => {
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

  return fetch(url).then(res => res.json());
}

getForecast.forCurrent = async (params: DaysForecastPayload): Promise<ForecastResponse> => {
  const aggregateHours = 1;
  const forecastDays = 1;

  return getForecast({
    ...params,
    aggregateHours,
    forecastDays,
  });
};

getForecast.for7Days = async (params: DaysForecastPayload): Promise<ForecastResponse> => {
  const aggregateHours = 24;
  const forecastDays = 7;

  return getForecast({
    ...params,
    aggregateHours,
    forecastDays,
  });
};
