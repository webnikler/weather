import { getGeoPosition } from '../../core/utils/data/geo-position';
import { DataLoaderResult, useDataLoader } from '../../core/utils/hooks/data-loader';
import { getAddressByCoordinates } from './api';
import { parseAddressToString } from './model';

export const useCurrentPlace = (): DataLoaderResult<string> => {
  return useDataLoader(async () => {
    const [lat, lon] = await getGeoPosition();
    const response = await getAddressByCoordinates({ lat, lon, count: 1 });

    return parseAddressToString(response);
  }, []);
};
