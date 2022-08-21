import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

type LocationData = {
  coords: Location.LocationObjectCoords,
  loading: boolean;
  error: Error;
}

const getCoords = async (): Promise<Location.LocationObjectCoords> => {
  const {
    granted,
  } = await Location.requestForegroundPermissionsAsync();

  if (!granted) {
    throw Error('Permission to access location was denied');
  }

  const {
    coords,
  } = await Location.getCurrentPositionAsync({});

  return coords;
}

export const useLocation = (): LocationData => {
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCoords()
      .then((coords) => setCoords(coords))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { error, coords, loading };
}
