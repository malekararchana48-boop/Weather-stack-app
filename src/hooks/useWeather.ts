import { useState, useCallback } from 'react';
import { weatherApi } from '../services/weatherApi';
import type {
  CurrentWeatherResponse,
  ForecastWeatherResponse,
  HistoricalWeatherResponse,
  MarineWeatherResponse,
  LocationSearchResponse,
  UnitType,
} from '../types/weather';

interface UseWeatherReturn {
  // Data states
  currentData: CurrentWeatherResponse | null;
  forecastData: ForecastWeatherResponse | null;
  historicalData: HistoricalWeatherResponse | null;
  marineData: MarineWeatherResponse | null;
  locationData: LocationSearchResponse | null;
  
  // Loading and error states
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchCurrentWeather: (query: string, unit?: UnitType) => Promise<void>;
  fetchForecast: (query: string, days?: number, unit?: UnitType) => Promise<void>;
  fetchHistorical: (query: string, date: string, unit?: UnitType) => Promise<void>;
  fetchHistoricalRange: (query: string, startDate: string, endDate: string, unit?: UnitType) => Promise<void>;
  fetchMarine: (lat: number, lon: number, unit?: UnitType) => Promise<void>;
  fetchMarineForecast: (lat: number, lon: number, days?: number, unit?: UnitType) => Promise<void>;
  searchLocation: (query: string) => Promise<void>;
  clearError: () => void;
  clearData: () => void;
}

export const useWeather = (): UseWeatherReturn => {
  const [currentData, setCurrentData] = useState<CurrentWeatherResponse | null>(null);
  const [forecastData, setForecastData] = useState<ForecastWeatherResponse | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalWeatherResponse | null>(null);
  const [marineData, setMarineData] = useState<MarineWeatherResponse | null>(null);
  const [locationData, setLocationData] = useState<LocationSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearData = useCallback(() => {
    setCurrentData(null);
    setForecastData(null);
    setHistoricalData(null);
    setMarineData(null);
    setLocationData(null);
    setError(null);
  }, []);

  const fetchCurrentWeather = useCallback(async (query: string, unit: UnitType = 'm') => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherApi.getCurrentWeather(query, unit);
      setCurrentData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch current weather');
      setCurrentData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchForecast = useCallback(async (query: string, days: number = 7, unit: UnitType = 'm') => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherApi.getForecast(query, days, unit);
      setForecastData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch forecast');
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistorical = useCallback(async (query: string, date: string, unit: UnitType = 'm') => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherApi.getHistorical(query, date, unit);
      setHistoricalData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch historical data');
      setHistoricalData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistoricalRange = useCallback(async (
    query: string,
    startDate: string,
    endDate: string,
    unit: UnitType = 'm'
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherApi.getHistoricalRange(query, startDate, endDate, unit);
      setHistoricalData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch historical data range');
      setHistoricalData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMarine = useCallback(async (lat: number, lon: number, unit: UnitType = 'm') => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherApi.getMarine(lat, lon, unit);
      setMarineData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch marine data');
      setMarineData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMarineForecast = useCallback(async (
    lat: number,
    lon: number,
    days: number = 7,
    unit: UnitType = 'm'
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherApi.getMarineForecast(lat, lon, days, unit);
      setMarineData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch marine forecast');
      setMarineData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchLocation = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherApi.searchLocation(query);
      setLocationData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search location');
      setLocationData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    currentData,
    forecastData,
    historicalData,
    marineData,
    locationData,
    loading,
    error,
    fetchCurrentWeather,
    fetchForecast,
    fetchHistorical,
    fetchHistoricalRange,
    fetchMarine,
    fetchMarineForecast,
    searchLocation,
    clearError,
    clearData,
  };
};

export default useWeather;
