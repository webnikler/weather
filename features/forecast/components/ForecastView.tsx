import { AppLayout } from '@app/components';
import { Text, Box } from 'native-base';
import React, { useCallback, useState } from 'react';

import { ForecastViewMode, useForecast } from '..';
import { ForecastHoursList } from './ForecastHoursList';

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

  const renderTopContent = useCallback(() => {
    return viewMode === ForecastViewMode.day ? (
      <Text>Top content for day view mode</Text>
    ) : (
      <Text>Top content for week view mode</Text>
    );
  }, [viewMode]);

  const renderBottomContent = useCallback(() => {
    return viewMode === ForecastViewMode.day ? (
      <ForecastHoursList data={forecastList!} />
    ) : (
      <Text color="lightText">Bottom content for week view mode</Text>
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
