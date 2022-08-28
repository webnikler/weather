import * as Location from 'expo-location';

export type GeoPosition = [number, number];

export const getGeoPosition = async (): Promise<GeoPosition> => {
  const requestPermissions = () => Location.requestForegroundPermissionsAsync();
  const getCurrentGeoLocation = () => Location.getCurrentPositionAsync({});

  const { granted } = await requestPermissions();

  if (!granted) {
    throw Error('Permission to access location was denied');
  }

  const { coords } = await getCurrentGeoLocation();

  return [coords.latitude, coords.longitude];
};

getGeoPosition.string = async (): Promise<string> =>
  getGeoPosition().then((position) => position.join());
