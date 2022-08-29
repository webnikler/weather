import { Box, Text, Pressable, MoonIcon } from 'native-base';
import React from 'react';

type MiniCardProps = {
  topText: string;
  icon?: string;
  bottomText: string;
};

export const ForecastMiniCard = ({ topText, icon, bottomText }: MiniCardProps) => {
  return (
    <Pressable>
      {({ isPressed }) => {
        const bgCard = isPressed
          ? {
              linearGradient: {
                colors: ['#0648F1', '#11ACFF'],
                start: [0, 0],
                end: [1, 1],
              },
            }
          : '#2352CB';

        return (
          <Box
            bg={bgCard}
            pt="1"
            paddingX="4"
            pb="3"
            rounded="33"
            style={{
              justifyContent: 'space-between',
              flexShrink: 1,
              alignItems: 'center',
              height: 110,
              width: '100%',
              transform: [
                {
                  scale: isPressed ? 1.1 : 1,
                },
              ],
            }}>
            <Text color="lightText" fontWeight="600" fontSize="15">
              {topText}
            </Text>
            <MoonIcon size="8" color="lightText" />
            <Text mt="2" fontSize="13" color="lightText" fontWeight="600">
              {bottomText}
            </Text>
          </Box>
        );
      }}
    </Pressable>
  );
};
