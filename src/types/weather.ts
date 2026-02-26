export interface WeatherRequest {
  type: string;
  query: string;
  language: string;
  unit: string;
}

export interface WeatherLocation {
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
  'pm2_5': string;
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
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  precip: number;
  humidity: number;
  visibility: number;
  pressure: number;
  cloudcover: number;
  heatindex: number;
  dewpoint: number;
  windchill: number;
  windgust: number;
  feelslike: number;
  chanceofrain: number;
  chanceofremdry: number;
  chanceofwindy: number;
  chanceofovercast: number;
  chanceofsunshine: number;
  chanceoffrost: number;
  chanceofhightemp: number;
  chanceoffog: number;
  chanceofsnow: number;
  chanceofthunder: number;
  uv_index: number;
}

export interface ForecastResponse {
  request: WeatherRequest;
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: {
    [date: string]: ForecastDay;
  };
}

export interface CurrentWeatherResponse {
  request: WeatherRequest;
  location: WeatherLocation;
  current: CurrentWeather;
}

export interface HistoricalResponse {
  request: WeatherRequest;
  location: WeatherLocation;
  current: CurrentWeather;
  historical: {
    [date: string]: {
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
    };
  };
}

export interface MarineWeather {
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
  water_temperature: number;
  wave_height: number;
  wave_direction: string;
  wave_period: number;
  swell_height: number;
  swell_direction: string;
  swell_period: number;
}

export interface MarineResponse {
  request: WeatherRequest;
  location: WeatherLocation;
  current: MarineWeather;
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

export interface LocationSearchResponse {
  request: WeatherRequest;
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

export type WeatherTab = 'current' | 'forecast' | 'historical' | 'marine' | 'location';

export interface SearchFilters {
  query: string;
  unit: 'm' | 'f' | 's';
  language: string;
}
