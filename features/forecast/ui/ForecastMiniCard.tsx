import { Box, Text, MoonIcon } from 'native-base';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type ForecastMiniCardProps = {
  topText: string;
  icon?: string;
  bottomText: string;
  isActive?: boolean;
};

export const ForecastMiniCard = ({
  topText,
  icon,
  bottomText,
  isActive,
}: ForecastMiniCardProps) => {
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
    height: 110,
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
      <MoonIcon size={8} color="lightText" />
      <Text mt={2} fontSize={13} color="lightText" fontFamily={fontFamily}>
        {bottomText}
      </Text>
    </Box>
  );
};
