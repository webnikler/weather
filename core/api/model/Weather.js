export class WeatherModel {
  cityName = '';
  list = new Map();

  get firstFourItems() {
    return [...this.list.values()].slice(0, 4);
  }

  constructor({
    city: {
      name,
    },
    list,
  }) {
    this.cityName = name;

    list.forEach((itemData) => {
      const itemModel = new WeatherItemModel(itemData);
      this.list.set(itemModel.dateTime, itemModel);
    })
  }
}

export class WeatherItemModel {
  dateTime = 0;
  temperature = 0;
  temperatureLimits = [0, 0];
  humidity = 0;
  description = '';
  title = '';
  iconId = '';
  windSpeed = 0;

  constructor({
    dt: dateTime,
    main: {
      temp: temperature,
      temp_min: min,
      temp_max: max,
      humidity,
    },
    weather: [
      {
        description,
        icon: iconId,
        main: title,
      }
    ],
    wind: {
      speed: windSpeed,
    }
  }) {
    this.dateTime = dateTime;
    this.temperature = temperature;
    this.temperatureLimits = [min, max];
    this.humidity = humidity;
    this.title = title;
    this.description = description;
    this.iconId = iconId;
    this.windSpeed = windSpeed;
  }
}