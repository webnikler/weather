import { ForecastView } from '@app/features/forecast/components';
import { useCurrentPlace } from '@app/features/place';
import { MavenPro_700Bold, MavenPro_500Medium } from '@expo-google-fonts/maven-pro';
import { OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';

const nativeBaseConfig = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

const App = (): JSX.Element => {
  const [fontsLoaded] = useFonts({
    MavenPro_700Bold,
    MavenPro_500Medium,
    OpenSans_600SemiBold,
  });

  const [unitGroup, setUnitGroup] = useState('metric');
  const [lang, setLang] = useState('ru');
  const [placeLoading, place, placeError] = useCurrentPlace();

  return (
    <NativeBaseProvider config={nativeBaseConfig}>
      <ForecastView lang={lang} location={place as string} />
    </NativeBaseProvider>
  );
};

export default App;
