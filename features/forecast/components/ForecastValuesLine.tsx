import { AppIcon } from '@app/components';
import { Box, HStack, Text } from 'native-base';

export type ForecastValuesLineProps = {
  wind?: number;
  humidity?: number;
  rainChance?: number;
};

export type ForecastValuesLineItemProps = {
  iconName: string;
  description: string;
  value?: number;
  postfix: string;
};

export const ForecastValuesLine = ({
  wind,
  humidity,
  rainChance,
}: ForecastValuesLineProps): JSX.Element => {
  const color = '#E8E8E8';

  const renderItem = ({ iconName, description, value, postfix }: ForecastValuesLineItemProps) => {
    const fontFamily = 'OpenSans_600SemiBold';

    return (
      <Box alignItems="center" flex={1}>
        <AppIcon name={iconName} dir="main" />
        <Text color={color} fontFamily={fontFamily}>
          {value}
          {postfix}
        </Text>
        <Text opacity="0.7" color={color} fontFamily={fontFamily}>
          {description}
        </Text>
      </Box>
    );
  };

  const items: ForecastValuesLineItemProps[] = [
    { iconName: 'wind', description: 'Wind', value: wind, postfix: ' км/ч' },
    { iconName: 'humidity', description: 'Humidity', value: humidity, postfix: '%' },
    { iconName: 'rain', description: 'Chance of rain', value: rainChance, postfix: '%' },
  ].filter(({ value }) => value !== undefined);

  return (
    <Box padding={4}>
      <HStack
        justifyContent="space-around"
        borderTopColor={color}
        borderTopWidth={1}
        paddingTop={4}>
        {items.map(renderItem)}
      </HStack>
    </Box>
  );
};
