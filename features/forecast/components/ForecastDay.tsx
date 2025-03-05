import { AppIcon } from '@app/components';
import { View, Text, Box } from 'native-base';
import React from 'react';

import { ForecastItem } from '../model';

type ForecastDayProps = {
  data: ForecastItem[];
};

export const ForecastDay = ({ data }: ForecastDayProps): JSX.Element => {
  const dataNow = data ? data[0] : null;
  console.log(dataNow);
  const b = dataNow ? dataNow.icon : '';
  return (
    <View>
      <AppIcon name="rain" dir="weather" size={100} />
      <Text>{b} </Text>
    </View>
  );
};
