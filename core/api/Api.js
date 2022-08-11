import { API_KEY } from '@env'

/**
 * Api service
 * Create instance and use it as singleton
 */
class Api {
  #base = 'https://api.openweathermap.org/data/2.5/forecast';
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
    return query.length ? `${base}?${qeury}` : base;
  }

  /**
   * https://openweathermap.org/current
   * @return {Promise} Response data
   */
  async getDailyForecast({
    coordinates: [lat, lon] = [],
    daysCount: cnt = 7,
    lang = 'ru',
    units = 'metric',
  }) {
    const appid = this.#apiKey;
    const params = { lat, lon, cnt, appid, units, lang };

    const uri = this.#buildURI(this.#base, params);
    const response = await fetch(uri);

    return await response.json();
  }
}

export default Api;
