import { DataLoaderResult, useDataLoader } from '../../core/utils/hooks/data-loader';
import { getCoords } from '../../core/utils/location';
import { getCurrentRegion } from './api';
import { parseRegion } from './model';

export const useRegion = (): DataLoaderResult<string> => {
  return useDataLoader(async () => {
    const [lat, lon] = await getCoords();
    const regionResponse = await getCurrentRegion({ lat, lon, count: 1 });

    return parseRegion(regionResponse);
  }, []);
};
