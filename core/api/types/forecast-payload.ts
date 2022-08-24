export type ForecastPayload = {
  locations: string;
  aggregateHours: number;
  forecastDays: number;
  unitGroup: string;
  lang: string;
}

export type DaysForecastPayload = Omit<ForecastPayload, 'aggregateHours' | 'forecastDays'>;
