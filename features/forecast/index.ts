import { DaysForecastPayload } from './types/payload'
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
    ?

    getForecast.day




    :

    getForecast.week
    ;
  const response = await apiFn(
    payload
  );

  return getForecastItems(response, payload.lang).slice(0, 7);
};

export const useForecast = (
  view: ForecastView,
  payload: DaysForecastPayload,
  options?: DataLoaderOptions,
): DataLoaderResult<ForecastItem[]> => {
  return useDataLoader(() => loadForecast(view, payload), [
    payload.unitGroup,
    payload.lang,
    payload.location,
    view,
  ], options);
}
