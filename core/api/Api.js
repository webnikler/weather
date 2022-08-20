import { API_KEY } from '@env'
import { buildUrl } from './utils/buildUrl';

const WEATHER_FORECAST_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const WEATHER_ICONS_BASE_URL = 'http://openweathermap.org/img/wn/';
const WEATHER_ICONS_SUFFIX = '@2x';
const WEATHER_ICONS_EXT = '.png';

export const get = async ({
  coordinates: [lat, lon] = [0, 0],
  daysCount: cnt = 40,
  lang = 'ru',
  units = 'metric',
}) => {
  const appid = API_KEY;
  const url = buildUrl(WEATHER_FORECAST_BASE_URL, {
    lat, lon, cnt, appid, units, lang,
  });

  return fetch(url).then(res => res.json());
}

export const buildImageUrl = imageId => [
  WEATHER_ICONS_BASE_URL,
  imageId,
  WEATHER_ICONS_SUFFIX,
  WEATHER_ICONS_EXT,
].join('');