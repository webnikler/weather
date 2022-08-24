import * as Location from 'expo-location';

type LocationCoords = [number, number];

export const getCoords = async (): Promise<LocationCoords> => {
  const requestPermissions = () => Location.requestForegroundPermissionsAsync();
  const getLocation = () => Location.getCurrentPositionAsync({});

  const { granted } = await requestPermissions();

  if (!granted) {
    throw Error('Permission to access location was denied');
  }

  const { coords } = await getLocation();

  return [
    coords.latitude,
    coords.longitude,
  ];
}

getCoords.string = async (): Promise<string> => getCoords().then(coords => coords.join());
