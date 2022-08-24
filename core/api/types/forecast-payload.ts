export type ForecastPayload = {
  location: string;
  aggregateHours: number;
  forecastDays: number;
  unitGroup: string;
  lang: string;
}

export type DaysForecastPayload = Omit<ForecastPayload, 'aggregateHours' | 'forecastDays'>;
