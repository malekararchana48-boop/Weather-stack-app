import axios, { AxiosError } from 'axios';
import type {
  CurrentWeatherResponse,
  ForecastWeatherResponse,
  HistoricalWeatherResponse,
  MarineWeatherResponse,
  LocationSearchResponse,
  ApiError,
  UnitType,
} from '../types/weather';

const API_KEY = 'key';
const BASE_URL = 'https://api.weatherstack.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add API key
apiClient.interceptors.request.use((config) => {
  if (config.params) {
    config.params.access_key = API_KEY;
  } else {
    config.params = { access_key: API_KEY };
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.data?.error) {
      const apiError = error.response.data.error;
      throw new Error(`API Error ${apiError.code}: ${apiError.info}`);
    }
    throw new Error('Network error occurred');
  }
);

export const weatherApi = {
  // Get current weather for a location
  getCurrentWeather: async (
    query: string,
    unit: UnitType = 'm',
    language: string = 'en'
  ): Promise<CurrentWeatherResponse> => {
    const response = await apiClient.get<CurrentWeatherResponse>('/current', {
      params: {
        query,
        units: unit,
        language,
      },
    });
    return response.data;
  },

  // Get weather forecast for a location
  getForecast: async (
    query: string,
    days: number = 7,
    unit: UnitType = 'm',
    language: string = 'en',
    hourly: boolean = false,
    interval: number = 1
  ): Promise<ForecastWeatherResponse> => {
    const response = await apiClient.get<ForecastWeatherResponse>('/forecast', {
      params: {
        query,
        forecast_days: days,
        units: unit,
        language,
        hourly: hourly ? 1 : 0,
        interval,
      },
    });
    return response.data;
  },

  // Get historical weather data
  getHistorical: async (
    query: string,
    date: string,
    unit: UnitType = 'm',
    language: string = 'en',
    hourly: boolean = false
  ): Promise<HistoricalWeatherResponse> => {
    const response = await apiClient.get<HistoricalWeatherResponse>('/historical', {
      params: {
        query,
        historical_date: date,
        units: unit,
        language,
        hourly: hourly ? 1 : 0,
      },
    });
    return response.data;
  },

  // Get historical weather data for date range
  getHistoricalRange: async (
    query: string,
    dateStart: string,
    dateEnd: string,
    unit: UnitType = 'm',
    language: string = 'en',
    hourly: boolean = false
  ): Promise<HistoricalWeatherResponse> => {
    const response = await apiClient.get<HistoricalWeatherResponse>('/historical', {
      params: {
        query,
        historical_date_start: dateStart,
        historical_date_end: dateEnd,
        units: unit,
        language,
        hourly: hourly ? 1 : 0,
      },
    });
    return response.data;
  },

  // Get marine weather data
  getMarine: async (
    lat: number,
    lon: number,
    unit: UnitType = 'm',
    language: string = 'en',
    tide: boolean = false
  ): Promise<MarineWeatherResponse> => {
    const response = await apiClient.get<MarineWeatherResponse>('/marine', {
      params: {
        query: `${lat},${lon}`,
        units: unit,
        language,
        tide: tide ? 1 : 0,
      },
    });
    return response.data;
  },

  // Get marine forecast
  getMarineForecast: async (
    lat: number,
    lon: number,
    days: number = 7,
    unit: UnitType = 'm',
    language: string = 'en',
    tide: boolean = false
  ): Promise<MarineWeatherResponse> => {
    const response = await apiClient.get<MarineWeatherResponse>('/marine', {
      params: {
        query: `${lat},${lon}`,
        forecast_days: days,
        units: unit,
        language,
        tide: tide ? 1 : 0,
      },
    });
    return response.data;
  },

  // Search for locations
  searchLocation: async (
    query: string,
    language: string = 'en'
  ): Promise<LocationSearchResponse> => {
    const response = await apiClient.get<LocationSearchResponse>('/autocomplete', {
      params: {
        query,
        language,
      },
    });
    return response.data;
  },

  // Get location information
  getLocation: async (
    query: string,
    language: string = 'en'
  ): Promise<LocationSearchResponse> => {
    const response = await apiClient.get<LocationSearchResponse>('/timezone', {
      params: {
        query,
        language,
      },
    });
    return response.data;
  },
};

export default weatherApi;
