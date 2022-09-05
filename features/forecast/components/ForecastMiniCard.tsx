import { AppIcon } from '@app/components';
import { Box, Text } from 'native-base';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type ForecastMiniCardProps = {
  topText: string;
  iconName: string;
  bottomText: string;
  isActive?: boolean;
  iconDir?: string;
};

export const ForecastMiniCard = ({
  topText,
  iconName,
  bottomText,
  isActive,
  iconDir = 'weather',
}: ForecastMiniCardProps): JSX.Element => {
  const fontFamily = 'OpenSans_600SemiBold';

  const bgGradient = {
    linearGradient: {
      colors: ['#0648F1', '#11ACFF'],
      start: [0, 0],
      end: [1, 1],
    },
  };

  const boxStyle: StyleProp<ViewStyle> = {
    justifyContent: 'space-between',
    flexShrink: 1,
    alignItems: 'center',

    width: '100%',
    transform: [
      {
        scale: isActive ? 1.1 : 1,
      },
    ],
  };

  const bgCard = isActive ? bgGradient : '#2352CB';

  return (
    <Box bg={bgCard} pt={1} paddingX={4} pb={3} rounded={33} style={boxStyle}>
      <Text color="lightText" fontFamily={fontFamily} fontSize={15}>
        {topText}
      </Text>
      <AppIcon name={iconName} iconDir={iconDir} />
      <Text mt={2} fontSize={13} color="lightText" fontFamily={fontFamily}>
        {bottomText}
      </Text>
    </Box>
  );
};
