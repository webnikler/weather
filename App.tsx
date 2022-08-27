import React from "react";
import {
  Text,
  NativeBaseProvider,
  Box,
  ScrollView,
  Fab,
  Heading,
} from "native-base";

import { useState } from 'react';
import { ForecastView, useForecast } from './features/forecast';
import { useCurrentPlace } from './features/place';

const App = (): JSX.Element => {
  const [unitGroup, setUnitGroup] = useState('metric');
  const [lang, setLang] = useState('ru');
  const [view, setView] = useState(ForecastView.week);
  const [
    placeLoading,
    placeData,
    placeError
  ] = useCurrentPlace();
  const useForecastDepends = { unitGroup, lang, location: placeData };
  const useForecastOptions = { skipEffect: !placeData };
  const [
    forecastLoading,
    forecastList,
    forecastError
  ] = useForecast(view, useForecastDepends, useForecastOptions);
  const loading = [placeLoading, forecastLoading].some(loading => loading);
  const error = placeError || forecastError;

  const toggleView = () => setView((view) => +!view);

  const renderError = (): JSX.Element => (
    <Text>Error</Text>
  );

  const renderLoading = (): JSX.Element => (
    <Text>Loading</Text>
  );

  const renderContent = (): JSX.Element => (
    <ScrollView padding={4}>
      <Box safeAreaTop={8}></Box>
      <Heading>
        Данные за {
          view === ForecastView.week
            ? '7 дней'
            : '7 часов'
        }
      </Heading>
      <Text>Местоположениe: {placeData}</Text>
      {
        forecastList?.map((data) => (
          <Box
            key={data.datetime}
            padding={4}
            backgroundColor='lightBlue.300'
            borderRadius={12}
            shadow={1}
            marginTop={4}
          >
            <Text>Дата: {data.date}</Text>
            <Text>Время: {data.time}</Text>
            <Text>Температура: {data.temperature}°</Text>
            <Text>Скорость ветра: {data.windSpeed} м/с</Text>
            <Text>Влажность: {data.humidity}%</Text>
            <Text>Вероятность дождя: {data.rainChance}%</Text>
            <Text>Описание: {data.description}</Text>
          </Box>
        ))
      }
      <Box safeAreaBottom={12}></Box>
      <Fab size={12} onPress={toggleView} />
    </ScrollView>
  );

  const render = (): JSX.Element => {
    if (loading) {
      return renderLoading();
    } else if (error) {
      return renderError();
    } else {
      return renderContent();
    }
  }

  return (
    <NativeBaseProvider>
      {render()}
    </NativeBaseProvider>
  );
}

export default App;
