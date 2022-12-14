import { Box, VStack } from 'native-base';
import { useEffect } from 'react';
import { LayoutAnimation } from 'react-native';

export type AppLayoutProps = {
  renderTopContent: () => JSX.Element;
  renderBottomContent: () => JSX.Element;
};

const MAIN_BG_COLOR = '#0c0926';

const ANIMATION_DURATION = 250;

const PRIMARY_GRADIENT = {
  colors: ['#06C7F1', '#07B9E0', '#0648F1'],
  locations: [0, 0.31, 0.95],
  start: [0, 0],
  end: [0, 1],
};

export const AppLayout = ({
  renderTopContent,
  renderBottomContent,
}: AppLayoutProps): JSX.Element => {
  useEffect(() => {
    LayoutAnimation.configureNext({
      duration: ANIMATION_DURATION,
      update: {
        type: 'linear',
        property: LayoutAnimation.Properties.scaleY,
      },
    });
  }, [renderTopContent, renderBottomContent]);

  return (
    <Box backgroundColor={MAIN_BG_COLOR} flex={1}>
      <VStack alignItems="center" flex={1}>
        <Box
          safeAreaTop
          width="100%"
          bg={{ linearGradient: PRIMARY_GRADIENT }}
          borderRadius={16}
          borderTopRadius={0}>
          {renderTopContent()}
        </Box>
        <Box safeAreaBottom width="100%">
          {renderBottomContent()}
        </Box>
      </VStack>
    </Box>
  );
};
