import { AppLayout, TobBar } from '@app/components';
import { Text, Box } from 'native-base';
import React, { useCallback, useState } from 'react';

import { ForecastViewMode, useForecast } from '..';
import { ForecastDaysList } from './ForecastDaysList';
import { ForecastMiniCard } from './ForecastMiniCard';
import { ForecastValuesLine } from './ForecastValuesLine';

export type ForecastViewProps = {
  lang: string;
  location: string;
};

export const ForecastView = ({ lang, location }: ForecastViewProps): JSX.Element => {
  const [unitGroup, setUnitGroup] = useState('metric');
  const [viewMode, setViewMode] = useState(ForecastViewMode.week);
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

  const renderTopContent = useCallback(() => {
    return viewMode === ForecastViewMode.day ? (
      <>
        <TobBar leftIconName="fahrenheit" centerIconName="calendar" centerText="7 Days" />
        <Box flexDirection="row">
          <ForecastMiniCard bottomText="10:00" topText="24%" iconName="clear-day" />
          <ForecastMiniCard bottomText="10:00" topText="24%" iconName="clear-night" />
          <ForecastMiniCard bottomText="10:00" topText="24%" iconName="clear-night" isActive />
          <ForecastMiniCard bottomText="10:00" topText="24%" iconName="clear-night" />
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
      <Text color="lightText">Bottom content for dat view mode</Text>
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
