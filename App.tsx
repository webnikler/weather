import {
  Text,
  NativeBaseProvider,
  Box,
  ScrollView,
  Fab,
  Heading,
  Alert,
  HStack,
} from 'native-base';
import React, { useState } from 'react';

import { ForecastView, useForecast } from './features/forecast';
import { useCurrentPlace } from './features/place';

const App = (): JSX.Element => {
  const [unitGroup, setUnitGroup] = useState('metric');
  const [lang, setLang] = useState('ru');
  const [view, setView] = useState(ForecastView.week);
  const [placeLoading, placeData, placeError] = useCurrentPlace();
  const useForecastDepends = { unitGroup, lang, location: placeData };
  const useForecastOptions = { skipEffect: !placeData };
  const [forecastLoading, forecastList, forecastError] = useForecast(
    view,
    useForecastDepends,
    useForecastOptions
  );
  const loading = [placeLoading, forecastLoading].some((loading) => loading);
  const error = placeError || forecastError;

  const toggleView = () => setView((view) => +!view);

  const renderError = (): JSX.Element => (
    <Alert safeArea status="error">
      <HStack space={4} padding={2}>
        <Alert.Icon mt="1" />
        <Text>{error?.message || 'Unknown error'}</Text>
      </HStack>
    </Alert>
  );

  const renderLoading = (): JSX.Element => <Text>Loading</Text>;

  const renderContent = (): JSX.Element => (
    <ScrollView padding={4}>
      <Box safeAreaTop={8} />
      <Heading>Данные за {view === ForecastView.week ? '7 дней' : '7 часов'}</Heading>
      <Text>Местоположениe: {placeData}</Text>
      {forecastList?.map((data) => (
        <Box
          key={data.datetime}
          padding={4}
          backgroundColor="lightBlue.300"
          borderRadius={12}
          shadow={1}
          marginTop={4}>
          <Text>Дата: {data.date}</Text>
          <Text>Время: {data.time}</Text>
          <Text>Температура: {data.temperature}°</Text>
          <Text>Скорость ветра: {data.windSpeed} м/с</Text>
          <Text>Влажность: {data.humidity}%</Text>
          <Text>Вероятность дождя: {data.rainChance}%</Text>
          <Text>Описание: {data.description}</Text>
        </Box>
      ))}
      <Box safeAreaBottom={12} />
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
  };

  return <NativeBaseProvider>{render()}</NativeBaseProvider>;
};

export default App;
