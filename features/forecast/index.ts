import { DataLoaderOptions, DataLoaderResult, useDataLoader } from '@app/hooks/data-loader';
import { useEffect, useState } from 'react';

import { getForecast } from './api';
import { ForecastItem, getForecastItems } from './model';
import { DaysForecastPayload } from './types/payload';

export enum ForecastView {
  day,
  week,
}

const loadForecast = async (
  view: ForecastView,
  payload: DaysForecastPayload
): Promise<ForecastItem[]> => {
  const apiFn = view === ForecastView.day ? getForecast.day : getForecast.week;
  const response = await apiFn(payload);

  return getForecastItems(response, payload.lang).slice(0, 7);
};

export const useForecast = (
  view: ForecastView,
  payload: DaysForecastPayload,
  options?: DataLoaderOptions
): DataLoaderResult<ForecastItem[]> => {
  return useDataLoader(
    () => loadForecast(view, payload),
    [payload.unitGroup, payload.lang, payload.location, view],
    options
  );
};

export const useForecastLayout = (view: ForecastView) => {
  const [topHeight, setTopHeight] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(0);

  useEffect(() => {
    switch (view) {
      case ForecastView.day: {
        setTopHeight(0);
        setBottomHeight(210);
        break;
      }
      case ForecastView.week: {
        setTopHeight(360);
        setBottomHeight(0);
      }
    }
  }, [view]);

  return [topHeight, bottomHeight];
};
