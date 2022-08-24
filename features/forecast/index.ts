import { DaysForecastPayload, ForecastPayload } from './types/payload'
import { ForecastItem, getForecastItems } from './model';
import { DataLoaderOptions, DataLoaderResult, useDataLoader } from '../../core/utils/hooks/data-loader';
import { getForecast } from './api';

export enum ForecastView {
  day,
  week,
}

const loadForecast = async (
  view: ForecastView,
  payload: DaysForecastPayload
): Promise<ForecastItem[]> => {
  const apiFn = view === ForecastView.day
    ? getForecast.day
    : getForecast.week;

  return apiFn(payload)
    .then(data => getForecastItems(data));
};

export const useForecast = (
  view: ForecastView,
  depends: DaysForecastPayload,
  options?: DataLoaderOptions,
): DataLoaderResult<ForecastItem[]> => {
  return useDataLoader(() => loadForecast(view, depends), [
    depends.unitGroup,
    depends.lang,
    depends.location,
    view,
  ], options);
}
