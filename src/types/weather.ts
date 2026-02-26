// Weatherstack API Response Types

export interface RequestInfo {
  type: string;
  query: string;
  language: string;
  unit: string;
}

export interface Location {
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  localtime: string;
  localtime_epoch: number;
  utc_offset: string;
}

export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
}

export interface AirQuality {
  co: string;
  no2: string;
  o3: string;
  so2: string;
  pm2_5: string;
  pm10: string;
  'us-epa-index': string;
  'gb-defra-index': string;
}

export interface CurrentWeather {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  astro: Astro;
  air_quality: AirQuality;
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  astro: Astro;
  mintemp: number;
  maxtemp: number;
  avgtemp: number;
  totalsnow: number;
  sunhour: number;
  uv_index: number;
  hourly: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
}

export interface MarineData {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
  swell_height: number;
  swell_direction: number;
  swell_period: number;
  water_temperature: number;
  tide_height?: number;
  tide_direction?: string;
}

export interface MarineDay {
  date: string;
  date_epoch: number;
  astro: Astro;
  mintemp: number;
  maxtemp: number;
  avgtemp: number;
  totalsnow: number;
  sunhour: number;
  uv_index: number;
  hourly: MarineHourly[];
}

export interface MarineHourly {
  time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
  swell_height: number;
  swell_direction: number;
  swell_period: number;
  water_temperature: number;
  tide_height?: number;
}

export interface LocationResult {
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  utc_offset: string;
}

// API Response Types
export interface CurrentWeatherResponse {
  request: RequestInfo;
  location: Location;
  current: CurrentWeather;
}

export interface ForecastWeatherResponse {
  request: RequestInfo;
  location: Location;
  current: CurrentWeather;
  forecast: Record<string, ForecastDay>;
}

export interface HistoricalWeatherResponse {
  request: RequestInfo;
  location: Location;
  current: CurrentWeather;
  historical: Record<string, ForecastDay>;
}

export interface MarineWeatherResponse {
  request: RequestInfo;
  location: Location;
  current: MarineData;
  forecast?: Record<string, MarineDay>;
}

export interface LocationSearchResponse {
  request: RequestInfo;
  results: LocationResult[];
}

export interface ApiError {
  success: false;
  error: {
    code: number;
    type: string;
    info: string;
  };
}

// App State Types
export type WeatherTab = 'current' | 'forecast' | 'historical' | 'marine' | 'location';

export type UnitType = 'm' | 's' | 'f';

export interface SearchFilters {
  unit: UnitType;
  language: string;
  forecastDays?: number;
  historicalDate?: string;
  historicalDateStart?: string;
  historicalDateEnd?: string;
  hourly?: boolean;
  interval?: number;
  marineLat?: number;
  marineLon?: number;
  tide?: boolean;
}

export interface WeatherState {
  query: string;
  activeTab: WeatherTab;
  filters: SearchFilters;
  currentData: CurrentWeatherResponse | null;
  forecastData: ForecastWeatherResponse | null;
  historicalData: HistoricalWeatherResponse | null;
  marineData: MarineWeatherResponse | null;
  locationData: LocationSearchResponse | null;
  loading: boolean;
  error: string | null;
}
