import { AppIcon } from '@app/components';
import { Box, FlatList, HStack, Text } from 'native-base';
import { ListRenderItemInfo } from 'react-native';

import { ForecastItem } from '../model';

type ForecastDaysListProps = {
  data?: ForecastItem[];
};

export const ForecastDaysList = ({ data }: ForecastDaysListProps): JSX.Element | null => {
  const renderItem = ({ item }: ListRenderItemInfo<ForecastItem>): JSX.Element => (
    <Box py={4}>
      <HStack alignItems="center">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          fontFamily="MavenPro_700Bold"
          color="lightText"
          fontSize="15"
          width="30%">
          {item.dayName}
        </Text>
        <Box flex={1} flexDirection="row" alignItems="center">
          <AppIcon name={item.icon} dir="weather" size={60} />
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            color="lightText"
            width="60%"
            fontSize="13"
            fontFamily="MavenPro_500Medium"
            paddingLeft={2}>
            {item.description}
          </Text>
        </Box>
        <Text fontFamily="OpenSans_600SemiBold" color="lightText" fontSize="17">
          {item.temperature}°
        </Text>
      </HStack>
    </Box>
  );

  if (data) {
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.datetime.toString()}
        paddingLeft={28}
        paddingRight={28}
      />
    );
  } else {
    return null;
  }
};
