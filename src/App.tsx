import React, { useState, useCallback } from 'react';
import { Cloud } from 'lucide-react';
import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { HistoricalCard } from './components/HistoricalCard';
import { MarineCard } from './components/MarineCard';
import { LocationSearchCard } from './components/LocationSearchCard';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingState } from './components/LoadingState';
import { EmptyState } from './components/EmptyState';
import { HistoricalDatePicker } from './components/HistoricalDatePicker';
import type { WeatherTab, SearchFilters } from './types/weather';

function App() {
  const [activeTab, setActiveTab] = useState<WeatherTab>('current');
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    unit: 'm',
    language: 'en',
  });
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const {
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
    fetchMarine,
    searchLocation,
    clearError,
    clearData,
  } = useWeather();

  const handleSearch = useCallback(async (query: string, searchFilters: SearchFilters) => {
    setFilters(searchFilters);
    
    if (!searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev].slice(0, 10));
    }

    switch (activeTab) {
      case 'current':
        await fetchCurrentWeather(query, searchFilters);
        break;
      case 'forecast':
        await fetchForecast(query, 7, searchFilters);
        break;
      case 'historical':
        if (selectedDate) {
          await fetchHistorical(query, selectedDate, searchFilters);
        }
        break;
      case 'marine':
        await fetchMarine(query, searchFilters);
        break;
      case 'location':
        await searchLocation(query);
        break;
    }
  }, [activeTab, selectedDate, fetchCurrentWeather, fetchForecast, fetchHistorical, fetchMarine, searchLocation, searchHistory]);

  const handleTabChange = useCallback((tab: WeatherTab) => {
    setActiveTab(tab);
    clearData();
    setSelectedDate('');
  }, [clearData]);

  const handleLocationSelect = useCallback((location: string) => {
    setActiveTab('current');
    fetchCurrentWeather(location, filters);
  }, [fetchCurrentWeather, filters]);

  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
    if (filters.query) {
      fetchHistorical(filters.query, date, filters);
    }
  }, [filters, fetchHistorical]);

  const renderContent = () => {
    if (loading) {
      return <LoadingState />;
    }

    if (error) {
      return (
        <ErrorMessage
          message={error}
          onDismiss={clearError}
        />
      );
    }

    switch (activeTab) {
      case 'current':
        if (currentWeather) {
          return <CurrentWeatherCard data={currentWeather} unit={filters.unit} />;
        }
        break;
      case 'forecast':
        if (forecast) {
          return <ForecastCard data={forecast} unit={filters.unit} />;
        }
        break;
      case 'historical':
        if (historical) {
          return <HistoricalCard data={historical} unit={filters.unit} />;
        }
        if (selectedDate && !historical && !loading) {
          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <HistoricalDatePicker
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
              <EmptyState activeTab="historical" />
            </div>
          );
        }
        break;
      case 'marine':
        if (marine) {
          return <MarineCard data={marine} unit={filters.unit} />;
        }
        break;
      case 'location':
        if (locations) {
          return (
            <LocationSearchCard
              data={locations}
              onSelectLocation={handleLocationSelect}
            />
          );
        }
        break;
    }

    if (activeTab === 'historical') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <HistoricalDatePicker
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
          <EmptyState activeTab={activeTab} />
        </div>
      );
    }

    return <EmptyState activeTab={activeTab} />;
  };

  return (
    <div style={{ minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div
              style={{
                padding: '12px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.3), rgba(14, 165, 233, 0.3))',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Cloud size={32} style={{ color: 'var(--accent-cool)' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
                WeatherStack Pro
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Professional Weather Intelligence Platform
              </p>
            </div>
          </div>
        </header>

        <main>
          <SearchBar
            onSearch={handleSearch}
            onTabChange={handleTabChange}
            activeTab={activeTab}
            loading={loading}
          />

          <div style={{ marginTop: '24px' }}>
            {renderContent()}
          </div>
        </main>

        <footer style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {searchHistory.length > 0 && (
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Recent Searches
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {searchHistory.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(query, filters)}
                      className="glass-button"
                      style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Powered by WeatherStack API • Data provided for informational purposes
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
