export type ForecastLocationValue = {
  wdir: number;
  uvindex: number;
  datetimeStr: string;
  icon: string;
  preciptype: string;
  cin: number;
  cloudcover: number;
  pop: number;
  mint: number;
  datetime: number;
  precip: number;
  solarradiation: number;
  dew: number;
  humidity: number;
  temp: number;
  maxt: number;
  visibility: number;
  wspd: number;
  severerisk: number;
  solarenergy: number;
  heatindex: number;
  snowdepth: number;
  sealevelpressure: number;
  snow: number;
  wgust: number;
  conditions: string;
  windchill: null;
  cape: number;
};

export type ForecastCurrentConditions = {
  wdir: number;
  temp: number;
  sunrise: string;
  visibility: number;
  wspd: number;
  icon: string;
  stations: string;
  heatindex: number;
  cloudcover: number;
  datetime: string;
  precip: number;
  moonphase: number;
  snowdepth: null;
  sealevelpressure: number;
  dew: number;
  sunset: string;
  humidity: number;
  wgust: null;
  windchill: null;
};

export type ForecastLocation = {
  stationContributions: null;
  values: Array<ForecastLocationValue>;
  id: string;
  address: string;
  name: string;
  index: number;
  latitude: number;
  longitude: number;
  distance: number;
  time: number;
  tz: string;
  currentConditions: ForecastCurrentConditions;
  alerts: null;
};

export type ForecastColumn = {
  id: string;
  name: string;
  type: number;
  unit: null;
};

export type ForecastResponse = {
  columns: { [key: string]: ForecastColumn };
  remainingCost: number;
  queryCost: number;
  messages: null;
  location: ForecastLocation;
};
