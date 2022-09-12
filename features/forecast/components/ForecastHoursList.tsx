import { Box, Text, Flex, Button, ChevronRightIcon, FlatList, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, Dimensions } from 'react-native';

import { ForecastItem } from '../model';
import { ForecastMiniCard } from './ForecastMiniCard';

type ForecastHoursList = {
  data: ForecastItem[];
};

export const ForecastHoursList = ({ data }: ForecastHoursList): JSX.Element | null => {
  if (!data) {
    return null;
  }

  const marginDisplay = 25;
  const contentWidth = Dimensions.get('window').width - marginDisplay * 2;
  const separated = 10;
  const countCard = 4;
  const widthCard = (contentWidth - separated * (countCard - 1)) / countCard;

  const renderTopPanel = (): JSX.Element => {
    return (
      <Flex direction="row" justify="space-between" marginX={15} align="center">
        <Text fontSize={24} bold color="lightText">
          Today
        </Text>
        <Button
          variant="link"
          _text={{ color: 'lightText', fontSize: 16 }}
          endIcon={<ChevronRightIcon color="lightText" />}>
          7 days
        </Button>
      </Flex>
    );
  };

  const renderSeparator = () => {
    return <View style={{ height: '100%', width: separated }} />;
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
