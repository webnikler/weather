import { ImageSourcePropType } from 'react-native';

export type IconSources = {
  [key: string]: { [key: string]: { source: ImageSourcePropType } };
};

export const iconSources: IconSources = {
  weather: {
    'clear-day': {
      source: require('assets/icons/weather/clear-day.png'),
    },
    'clear-night': {
      source: require('assets/icons/weather/clear-night.png'),
    },
    cloudy: {
      source: require('assets/icons/weather/cloudy.png'),
    },
    fog: {
      source: require('assets/icons/weather/fog.png'),
    },
    hail: {
      source: require('assets/icons/weather/hail.png'),
    },
    'partly-cloudy-day': {
      source: require('assets/icons/weather/partly-cloudy-day.png'),
    },
    'partly-cloudy-night': {
      source: require('assets/icons/weather/partly-cloudy-night.png'),
    },
    'rain-snow-showers-day': {
      source: require('assets/icons/weather/rain-snow-showers-day.png'),
    },
    'rain-snow-showers-night': {
      source: require('assets/icons/weather/rain-snow-showers-night.png'),
    },
    'rain-snow': {
      source: require('assets/icons/weather/rain-snow.png'),
    },
    rain: {
      source: require('assets/icons/weather/rain.png'),
    },
    'showers-day': {
      source: require('assets/icons/weather/showers-day.png'),
    },
    'showers-night': {
      source: require('assets/icons/weather/showers-night.png'),
    },
    sleet: {
      source: require('assets/icons/weather/sleet.png'),
    },
    'snow-showers-day': {
      source: require('assets/icons/weather/snow-showers-day.png'),
    },
    'snow-showers-night': {
      source: require('assets/icons/weather/snow-showers-night.png'),
    },
    snow: {
      source: require('assets/icons/weather/snow.png'),
    },
    'thunder-rain': {
      source: require('assets/icons/weather/thunder-rain.png'),
    },
    'thunder-showers-day': {
      source: require('assets/icons/weather/thunder-showers-day.png'),
    },
    'thunder-showers-night': {
      source: require('assets/icons/weather/thunder-showers-night.png'),
    },
    thunder: {
      source: require('assets/icons/weather/thunder.png'),
    },
    wind: {
      source: require('assets/icons/weather/wind.png'),
    },
  },
  main: {
    back: {
      source: require('assets/icons/main/back.png'),
    },
    calendar: {
      source: require('assets/icons/main/calendar.png'),
    },
    fahrenheit: {
      source: require('assets/icons/main/fahrenheit.png'),
    },
    forward: {
      source: require('assets/icons/main/forward.png'),
    },
    geo: {
      source: require('assets/icons/main/geo.png'),
    },
    humidity: {
      source: require('assets/icons/main/humidity.png'),
    },
    loading: {
      source: require('assets/icons/main/loading.png'),
    },
    menu: {
      source: require('assets/icons/main/menu.png'),
    },
    rain: {
      source: require('assets/icons/main/rain.png'),
    },
    wind: {
      source: require('assets/icons/main/wind.png'),
    },
  },
};
