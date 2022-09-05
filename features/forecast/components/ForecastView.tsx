import { AppLayout } from '@app/components';
import { Text, Box } from 'native-base';
import React, { useState } from 'react';

import { ForecastViewMode, useForecast, useForecastLayout } from '..';
import { ForecastMiniCard } from './ForecastMiniCard';

export type ForecastViewProps = {
  lang: string;
  location: string;
};

export const ForecastView = ({ lang, location }: ForecastViewProps): JSX.Element => {
  const [unitGroup, setUnitGroup] = useState('metric');
  const [viewMode, setViewMode] = useState(ForecastViewMode.day);
  const [layoutTopHeight, layoutBottomHeight] = useForecastLayout(viewMode);
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

  const renderTopContent = () => {
    return viewMode === ForecastViewMode.day ? (
      // <Text>Top content for day view mode</Text>
      <Box flexDirection="row">
        <ForecastMiniCard
          bottomText="10:00"
          topText="24%"
          iconName="clear-day"
          packageDir="weather"
        />
        <ForecastMiniCard
          bottomText="10:00"
          topText="24%"
          iconName="clear-night"
          packageDir="weather"
        />
        <ForecastMiniCard
          bottomText="10:00"
          topText="24%"
          iconName="clear-night"
          packageDir="weather"
          isActive
        />
        <ForecastMiniCard
          bottomText="10:00"
          topText="24%"
          iconName="clear-night"
          packageDir="weather"
        />
      </Box>
    ) : (
      <Text>Top content for week view mode</Text>
    );
  };

  const renderBottomContent = () => {
    return viewMode === ForecastViewMode.day ? (
      <Text color="lightText">Bottom content for dat view mode</Text>
    ) : (
      <Text color="lightText">Bottom content for week view mode</Text>
    );
  };

  const renderContent = () => (
    <AppLayout
      renderTopContent={() => renderTopContent()}
      renderBottomContent={() => renderBottomContent()}
      topContentHeight={layoutTopHeight}
      bottomContentHeight={layoutBottomHeight}
    />
  );

  return forecastError ? renderError(forecastError) : renderContent();
};
