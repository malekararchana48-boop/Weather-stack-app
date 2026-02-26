import axios from 'axios';
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  HistoricalResponse,
  MarineResponse,
  LocationSearchResponse,
  ApiError,
} from '../types/weather';

const API_KEY = 'key';
const BASE_URL = 'https://api.weatherstack.com';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function isApiError(response: any): response is ApiError {
  return response && response.success === false && response.error;
}

export async function getCurrentWeather(
  query: string,
  unit: 'm' | 'f' | 's' = 'm',
  language: string = 'en'
): Promise<CurrentWeatherResponse> {
  const response = await weatherApi.get('/current', {
    params: {
      access_key: API_KEY,
      query,
      unit,
      language,
    },
  });

  if (isApiError(response.data)) {
    throw new Error(response.data.error.info);
  }

  return response.data;
}

export async function getForecast(
  query: string,
  days: number = 7,
  unit: 'm' | 'f' | 's' = 'm',
  language: string = 'en'
): Promise<ForecastResponse> {
  const response = await weatherApi.get('/forecast', {
    params: {
      access_key: API_KEY,
      query,
      forecast_days: days,
      unit,
      language,
      hourly: 1,
    },
  });

  if (isApiError(response.data)) {
    throw new Error(response.data.error.info);
  }

  return response.data;
}

export async function getHistoricalWeather(
  query: string,
  date: string,
  unit: 'm' | 'f' | 's' = 'm',
  language: string = 'en'
): Promise<HistoricalResponse> {
  const response = await weatherApi.get('/historical', {
    params: {
      access_key: API_KEY,
      query,
      historical_date: date,
      unit,
      language,
      hourly: 1,
    },
  });

  if (isApiError(response.data)) {
    throw new Error(response.data.error.info);
  }

  return response.data;
}

export async function getHistoricalRange(
  query: string,
  startDate: string,
  endDate: string,
  unit: 'm' | 'f' | 's' = 'm',
  language: string = 'en'
): Promise<HistoricalResponse> {
  const response = await weatherApi.get('/historical', {
    params: {
      access_key: API_KEY,
      query,
      historical_date_start: startDate,
      historical_date_end: endDate,
      unit,
      language,
      hourly: 1,
    },
  });

  if (isApiError(response.data)) {
    throw new Error(response.data.error.info);
  }

  return response.data;
}

export async function getMarineWeather(
  query: string,
  unit: 'm' | 'f' | 's' = 'm',
  language: string = 'en',
  tide?: string
): Promise<MarineResponse> {
  const params: any = {
    access_key: API_KEY,
    query,
    unit,
    language,
  };

  if (tide) {
    params.tide = tide;
  }

  const response = await weatherApi.get('/marine', {
    params,
  });

  if (isApiError(response.data)) {
    throw new Error(response.data.error.info);
  }

  return response.data;
}

export async function searchLocations(
  query: string,
  limit: number = 10
): Promise<LocationSearchResponse> {
  const response = await weatherApi.get('/autocomplete', {
    params: {
      access_key: API_KEY,
      query,
      limit,
    },
  });

  if (isApiError(response.data)) {
    throw new Error(response.data.error.info);
  }

  return response.data;
}

export function getWeatherIconUrl(code: number, isDay: boolean = true): string {
  const iconMap: { [key: number]: string } = {
    113: isDay ? 'sun' : 'moon',
    116: isDay ? 'cloud-sun' : 'cloud-moon',
    119: 'cloud',
    122: 'cloud',
    143: 'fog',
    176: 'cloud-rain',
    179: 'cloud-snow',
    182: 'cloud-sleet',
    185: 'cloud-sleet',
    200: 'cloud-lightning',
    227: 'snow',
    230: 'snow',
    248: 'fog',
    260: 'fog',
    263: 'cloud-rain',
    266: 'cloud-rain',
    281: 'cloud-sleet',
    284: 'cloud-sleet',
    293: 'cloud-rain',
    296: 'cloud-rain',
    299: 'cloud-rain',
    302: 'cloud-rain',
    305: 'cloud-rain',
    308: 'cloud-rain',
    311: 'cloud-sleet',
    314: 'cloud-sleet',
    317: 'cloud-sleet',
    320: 'cloud-sleet',
    323: 'cloud-snow',
    326: 'cloud-snow',
    329: 'cloud-snow',
    332: 'cloud-snow',
    335: 'cloud-snow',
    338: 'cloud-snow',
    350: 'cloud-hail',
    353: 'cloud-rain',
    356: 'cloud-rain',
    359: 'cloud-rain',
    362: 'cloud-sleet',
    365: 'cloud-sleet',
    368: 'cloud-snow',
    371: 'cloud-snow',
    374: 'cloud-hail',
    377: 'cloud-hail',
    386: 'cloud-lightning',
    389: 'cloud-lightning',
    392: 'cloud-lightning',
    395: 'cloud-lightning',
  };

  return iconMap[code] || 'cloud';
}

export function getWeatherDescription(code: number): string {
  const descriptions: { [key: number]: string } = {
    113: 'Clear',
    116: 'Partly Cloudy',
    119: 'Cloudy',
    122: 'Overcast',
    143: 'Mist',
    176: 'Patchy Rain',
    179: 'Patchy Snow',
    182: 'Patchy Sleet',
    200: 'Thundery Outbreaks',
    227: 'Blowing Snow',
    230: 'Blizzard',
    248: 'Fog',
    260: 'Freezing Fog',
    263: 'Patchy Light Drizzle',
    266: 'Light Drizzle',
    281: 'Freezing Drizzle',
    293: 'Patchy Light Rain',
    296: 'Light Rain',
    299: 'Moderate Rain',
    302: 'Heavy Rain',
    305: 'Heavy Rain at Times',
    308: 'Torrential Rain',
    311: 'Light Freezing Rain',
    314: 'Moderate Freezing Rain',
    317: 'Light Sleet',
    320: 'Moderate Sleet',
    323: 'Patchy Light Snow',
    326: 'Light Snow',
    329: 'Patchy Moderate Snow',
    332: 'Moderate Snow',
    335: 'Patchy Heavy Snow',
    338: 'Heavy Snow',
    350: 'Ice Pellets',
    353: 'Light Rain Shower',
    356: 'Moderate Rain Shower',
    359: 'Torrential Rain Shower',
    362: 'Light Sleet Shower',
    365: 'Moderate Sleet Shower',
    368: 'Light Snow Shower',
    371: 'Moderate Snow Shower',
    374: 'Light Hail Shower',
    377: 'Moderate Hail Shower',
    386: 'Patchy Light Rain with Thunder',
    389: 'Moderate Rain with Thunder',
    392: 'Patchy Light Snow with Thunder',
    395: 'Moderate Snow with Thunder',
  };

  return descriptions[code] || 'Unknown';
}

export function getUnitSymbol(unit: 'm' | 'f' | 's'): { temp: string; speed: string; pressure: string } {
  switch (unit) {
    case 'f':
      return { temp: '°F', speed: 'mph', pressure: 'inHg' };
    case 's':
      return { temp: 'K', speed: 'km/h', pressure: 'mb' };
    case 'm':
    default:
      return { temp: '°C', speed: 'km/h', pressure: 'mb' };
  }
}
