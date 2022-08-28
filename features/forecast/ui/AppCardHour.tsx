import React from 'react';
import { Box, Text, Pressable, MoonIcon } from 'native-base';

type Props = {
  wet: number;
  icon?: string;
  time: string;
};

export const AppCardHour = ({ wet, icon, time}:Props) => {
  return (
    <Pressable>
      {({ isPressed }) => {
        return (
          <Box
            maxW="83px"
           
            // m="2"
            bg={
              isPressed
                ? {
                    linearGradient: {
                      colors: ['#0648F1', '#11ACFF'],
                      start: [0, 0],
                      end: [1, 1],
                    },
                  }
                : '#2352CB'
            }
            pt="5px"
            paddingX="17px"
            pb="11px"
            rounded="33px"
            style={{
              justifyContent: 'space-between',
              flexShrink:1,
              alignItems: 'center',
              height: 110,
              width: '100%',
              transform: [
                {
                  scale: isPressed ? 1.1 : 1,
                },
              ],
            }}>
            <Text color="lightText" fontWeight="600" fontSize="15px">
              {wet}%
            </Text>
            <MoonIcon /*size="50px"*/ size="40px" color="lightText" />
            <Text mt="2" fontSize="13px" color="lightText" fontWeight="600">
              {time}
            </Text>
          </Box>
        );
      }}
    </Pressable>
  );
};
