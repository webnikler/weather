import { API_KEY } from '@env'
import { buildUrl } from './utils/buildUrl';

const WEATHER_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata';
const WEATHER_FORECAST_URL = `${WEATHER_BASE_URL}/forecast`;

export const getForecast = async ({
  locations,
  aggregateHours,
  forecastDays,
  unitGroup,
  lang,
}) => {
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

getForecast.forCurrent = async (params) => {
  const aggregateHours = 1;
  const forecastDays = 1;

  return getForecast({
    ...params,
    aggregateHours,
    forecastDays,
  });
};

getForecast.for7Days = async (params) => {
  const aggregateHours = 24;
  const forecastDays = 7;

  return getForecast({
    ...params,
    aggregateHours,
    forecastDays,
  });
};
