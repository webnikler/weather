import React from "react";
import {
  Text,
  NativeBaseProvider,
  Box,
  Button,
  Center,
} from "native-base";

import { useState } from 'react';
import { ForecastView, useForecast } from './features/forecast';
import { useRegion } from './features/region';

const App = (): JSX.Element => {
  const [unitGroup, setUnitGroup] = useState('us');
  const [lang, setLang] = useState('ru');
  const [view, setView] = useState(ForecastView.day);
  const [
    regionLoading,
    regionData,
    regionError
  ] = useRegion();
  const useForecastDepends = { unitGroup, lang, location: regionData };
  const useForecastOptions = { skipEffect: !regionData };
  const [
    forecastLoading,
    forecastData,
    forecastError
  ] = useForecast(view, useForecastDepends, useForecastOptions);
  const loading = [regionLoading, forecastLoading].some(loading => loading);
  const error = regionError || forecastError;

  const toggleView = () => setView((view) => +!view);

  const renderError = (): JSX.Element => (
    <Text>Error</Text>
  );

  const renderLoading = (): JSX.Element => (
    <Text>Loading</Text>
  );

  const renderContent = (): JSX.Element => (
    <>
      <Text>{forecastData && forecastData[0]?.description}</Text>
      <Text>{regionData}</Text>
      <Button onPress={toggleView}>Toggle view</Button>
    </>
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
      <Center height="100%">
        <Box>{render()}</Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default App;
