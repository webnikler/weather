import { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { ForecastView, useForecast } from './features/forecast/forecast';

const App = (): JSX.Element => {
  // @todo add unitGroup selector
  const [unitGroup, setUnitGroup] = useState('us');
  // @todo add lang selector
  const [lang, setLang] = useState('ru');
  const [view, setView] = useState(ForecastView.day);
  const { data, loading, error } = useForecast(view, { unitGroup, lang });

  const toggleView = () => setView((view) => +!view);

  const renderError = (): JSX.Element => (
    <Text>Error</Text>
  );

  const renderLoading = (): JSX.Element => (
    <Text>Loading</Text>
  );

  const renderContent = (): JSX.Element => (
    <>
      <Text>{data.length}</Text>
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
