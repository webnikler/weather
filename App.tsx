import { ForecastView } from '@app/features/forecast/components';
import { useCurrentPlace } from '@app/features/place';
import { MavenPro_700Bold, MavenPro_500Medium } from '@expo-google-fonts/maven-pro';
import { OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { Box, NativeBaseProvider, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';

const nativeBaseConfig = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

const App = (): JSX.Element | null => {
  const [fontsLoaded] = useFonts({
    MavenPro_700Bold,
    MavenPro_500Medium,
    OpenSans_600SemiBold,
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [lang, setLang] = useState('ru');
  const [placeLoading, place, placeError] = useCurrentPlace();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider config={nativeBaseConfig}>
      <Box onLayout={onLayoutRootView} flex={1}>
        <ForecastView lang={lang} location={place as string} />
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
