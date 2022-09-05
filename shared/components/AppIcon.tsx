import { Image } from 'native-base';
import React from 'react';
import { ImageSourcePropType } from 'react-native';

type IconSources = {
  [key: string]: { [key: string]: { source: ImageSourcePropType } };
};

const iconSources: IconSources = {
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
};

type AppIconProps = {
  name: string;
  dir: string;
};

export const AppIcon = ({ name, dir }: AppIconProps): JSX.Element => {
  return <Image source={iconSources[dir][name].source} alt={name} />;
};
