import { DaysForecastPayload } from './types/payload'
import { ForecastItem, getForecastItems } from './model';
import { DataLoaderResult, useDataLoader } from '../../core/utils/hooks/data-loader';
import { getCoords } from '../../core/utils/location';
import { getForecast } from './api';

export enum ForecastView {
  day,
  week,
}

export type ForecastDepends = Omit<DaysForecastPayload, 'location'>;

const loadForecast = async (
  view: ForecastView,
  payload: ForecastDepends
): Promise<ForecastItem[]> => {
  let location: string;

  try {
    location = await getCoords.string();
  } catch (err) {
    return [];
  }

  const apiFn = view === ForecastView.day
    ? getForecast.day
    : getForecast.week;

  return apiFn({ ...payload, location })
    .then(data => getForecastItems(data));
};

export const useForecast = (
  view: ForecastView,
  depends: ForecastDepends,
): DataLoaderResult<ForecastItem[]> => {
  return useDataLoader(() => loadForecast(view, depends), [
    depends.unitGroup,
    depends.lang,
    view,
  ]);
}
