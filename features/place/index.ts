import { getGeoPosition } from '@app/data/geo-position';
import { DataLoaderResult, useDataLoader } from '@app/hooks/data-loader';

import { getAddressByCoordinates } from './api';
import { parseAddressToString } from './model';

export const useCurrentPlace = (): DataLoaderResult<string> => {
  return useDataLoader(async () => {
    const [lat, lon] = await getGeoPosition();
    const response = await getAddressByCoordinates({ lat, lon, count: 1 });

    if (!response.suggestions.length) {
      throw Error('Не удалось найти населенный пункт по координатам устройства');
    }

    return parseAddressToString(response);
  }, []);
};
