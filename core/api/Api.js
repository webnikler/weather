import { API_KEY } from '@env'
import { createContext } from 'react';
import { WeatherModel } from './model/Weather';

/**
 * Api service
 * Create instance and use it as singleton
 */
class Api {
  /**
   * Use inside components like this -> 'const api = useContext(Api.Context)'
   */
  static Context = createContext(new Api());

  /**
   * Use inside App.js
   */
  static Provider = Api.Context.Provider;

  #base = 'https://api.openweathermap.org/data/2.5/forecast';
  #iconsBase = 'http://openweathermap.org/img/wn';
  #apiKey = '';

  constructor() {
    this.#apiKey = API_KEY;
  }

  /**
   * Build query params string for request
   * @param {object} params - Query params as object { name: value, ... }
   * @returns {string}
   */
  #buildQuery(params) {
    return Object.entries(params)
      .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
      .join('&');
  }

  /**
   * Build uri string for request
   * @param {string} base - Base url without query params
   * @param {object} params - Query params as object { name: value, ... }
   * @returns {string}
   */
  #buildURI(base, params = {}) {
    const query = this.#buildQuery(params);
    return query.length ? `${base}?${query}` : base;
  }

  /**
   * https://openweathermap.org/current
   * @return {Promise} WeatherModel
   */
  async getWeather({
    coordinates: [lat, lon] = [0, 0],
    daysCount: cnt = 40,
    lang = 'ru',
    units = 'metric',
  }) {
    const appid = this.#apiKey;
    const params = { lat, lon, cnt, appid, units, lang };

    const uri = this.#buildURI(this.#base, params);
    const response = await fetch(uri);
    const parsedResponse = await response.json();

    return new WeatherModel(parsedResponse);
  }

  getIconURI(iconId = '') {
    return `${this.#iconsBase}/${iconId}@2x.png`;
  }
}

export default Api;
