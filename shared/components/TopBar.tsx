import { Box, HStack, Text } from 'native-base';
import { Pressable } from 'react-native';

import { AppIcon } from './AppIcon/AppIcon';

export type TobBarProps = {
  leftIconName?: string;
  handleLeftIconClick?: () => void;
  centerText?: string;
  centerIconName?: string;
  handleCenterClick?: () => void;
};

export const TobBar = ({
  leftIconName,
  handleLeftIconClick,
  centerText,
  centerIconName,
  handleCenterClick,
}: TobBarProps) => {
  const iconDir = 'main';
  const fontFamily = 'MavenPro_700Bold';

  return (
    <Box paddingY={4}>
      <HStack paddingX={4} justifyContent="space-between">
        {leftIconName && (
          <AppIcon name={leftIconName} dir={iconDir} onPress={handleLeftIconClick} />
        )}
        <AppIcon name="menu" dir={iconDir} />
      </HStack>
      <HStack justifyContent="center">
        <Pressable onPress={handleCenterClick}>
          <Box flexDirection="row" alignItems="center">
            {centerIconName && <AppIcon marginRight={1} name={centerIconName} dir={iconDir} />}
            {centerText && (
              <Text fontFamily={fontFamily} fontSize={20} color="white">
                {centerText}
              </Text>
            )}
          </Box>
        </Pressable>
      </HStack>
    </Box>
  );
};
