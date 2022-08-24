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
}

const parseForecastValue = (value: ForecastLocationValue): ForecastItem => {
  return {
    temperature: value.temp,
    description: value.conditions,
    date: value.datetime.toString(),
    windSpeed: value.wspd,
    humidity: value.humidity,
    rainChance: value.pop,
    time: value.datetime.toString(),
  };
};

export const getForecastItems = (forecastResponse: ForecastResponse): ForecastItem[] => {
  return forecastResponse.location.values.map(v => parseForecastValue(v));
}
