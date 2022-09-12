import { Box, Text, Flex, Button, ChevronRightIcon, FlatList, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, Dimensions } from 'react-native';

import { ForecastItem } from '../model';
import { ForecastMiniCard } from './ForecastMiniCard';

type ForecastHoursListProps = {
  data: ForecastItem[];
};

export const ForecastHoursList = ({ data }: ForecastHoursListProps): JSX.Element | null => {
  if (!data) {
    return null;
  }

  const fontFamily = 'OpenSans_600SemiBold';
  const textColor = 'lightText';
  const marginDisplay = 25;
  const contentWidth = Dimensions.get('window').width - marginDisplay * 2;
  const separatorWidth = 10;
  const cardsCount = 4;
  const widthCard = (contentWidth - separatorWidth * (cardsCount - 1)) / cardsCount;

  const renderTopPanel = (): JSX.Element => {
    return (
      <Flex direction="row" justify="space-between" marginX={15} align="center">
        <Text fontSize={24} bold color={textColor} fontFamily={fontFamily}>
          Today
        </Text>
        <Button
          variant="link"
          _text={{ color: textColor, fontSize: 16, fontFamily }}
          endIcon={<ChevronRightIcon color={textColor} />}>
          7 days
        </Button>
      </Flex>
    );
  };

  const renderSeparator = () => {
    return <View style={{ height: '100%', width: separatorWidth }} />;
  };

  const renderCardsList = (): JSX.Element => {
    const renderItem = ({ item }: ListRenderItemInfo<ForecastItem>): JSX.Element => {
      return (
        <ForecastMiniCard
          width={widthCard}
          topText={item.humidity + '%'}
          bottomText={item.time}
          iconName={item.icon}
        />
      );
    };

    return (
      <View marginX={marginDisplay}>
        <FlatList
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.datetime.toString()}
          contentContainerStyle={{ paddingVertical: 20 }}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    );
  };

  return (
    <Box>
      {renderTopPanel()}
      {renderCardsList()}
    </Box>
  );
};
