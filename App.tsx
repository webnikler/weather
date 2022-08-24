import { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { ForecastView, useForecast } from './features/forecast';
import { useRegion } from './features/region';

const App = (): JSX.Element => {
  const [unitGroup, setUnitGroup] = useState('us');
  const [lang, setLang] = useState('ru');
  const [view, setView] = useState(ForecastView.day);

  const [location, regionLoading, regionError] = useRegion();
  const [forecast, forecastLoading, forecastError] = useForecast(view, {
    unitGroup,
    lang,
    location
  }, {
    skipEffect: !location,
  });

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
      <Text>{forecast && forecast[0]?.description}</Text>
      <Text>{location}</Text>
      <Button title='Click me' onPress={toggleView} />
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
    <View style={styles.main}>
      {render()}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
