import { useState, useCallback } from 'react';
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  HistoricalResponse,
  MarineResponse,
  LocationSearchResponse,
  SearchFilters,
} from '../types/weather';
import {
  getCurrentWeather,
  getForecast,
  getHistoricalWeather,
  getHistoricalRange,
  getMarineWeather,
  searchLocations,
} from '../services/weatherApi';

interface UseWeatherReturn {
  currentWeather: CurrentWeatherResponse | null;
  forecast: ForecastResponse | null;
  historical: HistoricalResponse | null;
  marine: MarineResponse | null;
  locations: LocationSearchResponse | null;
  loading: boolean;
  error: string | null;
  fetchCurrentWeather: (query: string, filters?: Partial<SearchFilters>) => Promise<void>;
  fetchForecast: (query: string, days?: number, filters?: Partial<SearchFilters>) => Promise<void>;
  fetchHistorical: (query: string, date: string, filters?: Partial<SearchFilters>) => Promise<void>;
  fetchHistoricalRange: (query: string, startDate: string, endDate: string, filters?: Partial<SearchFilters>) => Promise<void>;
  fetchMarine: (query: string, filters?: Partial<SearchFilters>) => Promise<void>;
  searchLocation: (query: string) => Promise<void>;
  clearError: () => void;
  clearData: () => void;
}

export function useWeather(): UseWeatherReturn {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [historical, setHistorical] = useState<HistoricalResponse | null>(null);
  const [marine, setMarine] = useState<MarineResponse | null>(null);
  const [locations, setLocations] = useState<LocationSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearData = useCallback(() => {
    setCurrentWeather(null);
    setForecast(null);
    setHistorical(null);
    setMarine(null);
    setLocations(null);
    setError(null);
  }, []);

  const fetchCurrentWeather = useCallback(async (
    query: string,
    filters: Partial<SearchFilters> = {}
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCurrentWeather(
        query,
        filters.unit || 'm',
        filters.language || 'en'
      );
      setCurrentWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch current weather');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchForecast = useCallback(async (
    query: string,
    days: number = 7,
    filters: Partial<SearchFilters> = {}
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getForecast(
        query,
        days,
        filters.unit || 'm',
        filters.language || 'en'
      );
      setForecast(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch forecast');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistorical = useCallback(async (
    query: string,
    date: string,
    filters: Partial<SearchFilters> = {}
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHistoricalWeather(
        query,
        date,
        filters.unit || 'm',
        filters.language || 'en'
      );
      setHistorical(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch historical weather');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistoricalRange = useCallback(async (
    query: string,
    startDate: string,
    endDate: string,
    filters: Partial<SearchFilters> = {}
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHistoricalRange(
        query,
        startDate,
        endDate,
        filters.unit || 'm',
        filters.language || 'en'
      );
      setHistorical(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch historical weather range');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMarine = useCallback(async (
    query: string,
    filters: Partial<SearchFilters> = {}
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMarineWeather(
        query,
        filters.unit || 'm',
        filters.language || 'en'
      );
      setMarine(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch marine weather');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchLocation = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchLocations(query);
      setLocations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search locations');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    currentWeather,
    forecast,
    historical,
    marine,
    locations,
    loading,
    error,
    fetchCurrentWeather,
    fetchForecast,
    fetchHistorical,
    fetchHistoricalRange,
    fetchMarine,
    searchLocation,
    clearError,
    clearData,
  };
}
