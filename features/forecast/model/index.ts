import { capitalize } from '@app/converters/capitalize';
import { formatTimeUnit } from '@app/converters/format-time-unit';

import { ForecastLocationValue, ForecastResponse } from '../types';

export type ForecastItem = {
  // Температура
  temperature: number;
  // Краткое описание погоды
  description: string;
  // Дата прогноза в формате {День недели}, {число} {месяц}
  date: string;
  // Скорость ветра
  windSpeed: number;
  // Влажность
  humidity: number;
  // Вероятность дождя
  rainChance: number;
  // Время прогноза в формате {часы}:{минуты}
  time: string;
  // Исходное значение времени
  datetime: number;
  // Имя иконки из папки assets/icons/weather
  icon: string;
  // Имя дня недели
  dayName: string;
};

const formatDate = (dateTime: number, lang: string): string => {
  const date = new Date(dateTime);
  const dayName = getDayName(dateTime, lang);
  const monthName = capitalize(date.toLocaleString(lang, { month: 'long' }));
  const dayNumber = date.getDate();

  return `${dayName}, ${dayNumber} ${monthName}`;
};

const getDayName = (dateTime: number, lang: string): string => {
  return capitalize(new Date(dateTime).toLocaleString(lang, { weekday: 'long' }));
};

const formatTime = (dateTime: number): string => {
  const date = new Date(dateTime);

  return [formatTimeUnit(date.getHours()), formatTimeUnit(date.getMinutes())].join(':');
};

const parseForecastValue = (value: ForecastLocationValue, lang: string): ForecastItem => {
  return {
    temperature: Math.round(value.temp),
    description: value.conditions,
    date: formatDate(value.datetime, lang),
    windSpeed: value.wspd,
    humidity: value.humidity,
    rainChance: value.pop,
    time: formatTime(value.datetime),
    datetime: value.datetime,
    icon: value.icon,
    dayName: getDayName(value.datetime, lang),
  };
};

export const getForecastItems = (
  forecastResponse: ForecastResponse,
  lang: string
): ForecastItem[] => {
  return forecastResponse.location.values.map((v) => parseForecastValue(v, lang));
};
