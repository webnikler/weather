import { AppLayout, TobBar } from '@app/components';
import { Text, Box } from 'native-base';
import React, { useCallback, useState } from 'react';

import { ForecastViewMode, useForecast } from '..';
import { ForecastDay } from './ForecastDay';
import { ForecastDaysList } from './ForecastDaysList';
import { ForecastHoursList } from './ForecastHoursList';
import { ForecastMiniCard } from './ForecastMiniCard';
import { ForecastValuesLine } from './ForecastValuesLine';

export type ForecastViewProps = {
  lang: string;
  location: string;
};

export const ForecastView = ({ lang, location }: ForecastViewProps): JSX.Element => {
  const [unitGroup, setUnitGroup] = useState('metric');
  const [viewMode, setViewMode] = useState(ForecastViewMode.day);
  const useForecastDepends = { unitGroup, lang, location };
  const useForecastOptions = { skipEffect: !location };
  const [forecastLoading, forecastList, forecastError] = useForecast(
    viewMode,
    useForecastDepends,
    useForecastOptions
  );

  const renderError = (error: Error) => (
    // @todo Универсальный компонент для отображения ошибок
    <Text>Error: {error?.message}</Text>
  );

  const renderTopContent = useCallback((): JSX.Element => {
    return viewMode === ForecastViewMode.day ? (
      <>
        <TobBar leftIconName="fahrenheit" centerIconName="calendar" centerText="7 Days" />
        <Box flexDirection="row">
          <ForecastDay data={forecastList!} />
        </Box>
        <ForecastValuesLine
          wind={forecastList?.[0].windSpeed}
          humidity={forecastList?.[0].humidity}
          rainChance={forecastList?.[0].rainChance}
        />
      </>
    ) : (
      <Text>Top content for week view mode</Text>
    );
  }, [viewMode, forecastList]);

  const renderBottomContent = useCallback(() => {
    return viewMode === ForecastViewMode.day ? (
      <ForecastHoursList data={forecastList!} />
    ) : (
      // <Text color="lightText">Bottom content for week view mode</Text>
      <ForecastDaysList data={forecastList!} />
    );
  }, [viewMode, forecastList]);

  const renderContent = () => (
    <AppLayout
      renderTopContent={() => renderTopContent()}
      renderBottomContent={() => renderBottomContent()}
    />
  );

  return forecastError ? renderError(forecastError) : renderContent();
};
