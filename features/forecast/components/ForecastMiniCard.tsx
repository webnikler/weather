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
  width?: number | string;
};

export const ForecastMiniCard = ({
  topText,
  width,
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
    alignItems: 'center',
    transform: [
      {
        scale: isActive ? 1.1 : 1,
      },
    ],
  };

  const bgCard = isActive ? bgGradient : '#2352CB';

  return (
    <Box
      flex={0.5}
      width={width}
      bg={bgCard}
      pt={1}
      paddingX={4}
      pb={3}
      rounded={33}
      style={boxStyle}>
      <Text color="lightText" fontFamily={fontFamily} fontSize={15}>
        {topText}
      </Text>
      <AppIcon name={iconName} dir={iconDir} />
      <Text mt={2} fontSize={13} color="lightText" fontFamily={fontFamily}>
        {bottomText}
      </Text>
    </Box>
  );
};
