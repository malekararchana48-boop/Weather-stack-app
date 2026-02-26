import React, { useState, useCallback } from 'react';
import { Cloud, Calendar, History, Waves, MapPin, Github, Twitter } from 'lucide-react';
import { useWeather } from './hooks/useWeather';
import {
  SearchBar,
  CurrentWeatherCard,
  ForecastCard,
  HistoricalCard,
  MarineCard,
  LocationSearchCard,
  HistoricalDatePicker,
  LoadingState,
  ErrorMessage,
  EmptyState,
} from './components';
import type { WeatherTab, UnitType } from './types/weather';
import { format } from 'date-fns';

const tabs: { id: WeatherTab; label: string; icon: React.ElementType }[] = [
  { id: 'current', label: 'Current', icon: Cloud },
  { id: 'forecast', label: 'Forecast', icon: Calendar },
  { id: 'historical', label: 'Historical', icon: History },
  { id: 'marine', label: 'Marine', icon: Waves },
  { id: 'location', label: 'Location', icon: MapPin },
];

function App() {
  const [activeTab, setActiveTab] = useState<WeatherTab>('current');
  const [unit, setUnit] = useState<UnitType>('m');
  const [historicalDate, setHistoricalDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [lastQuery, setLastQuery] = useState('');

  const {
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
    fetchMarine,
    searchLocation,
    clearError,
  } = useWeather();

  const handleSearch = useCallback((query: string, searchUnit: UnitType) => {
    setUnit(searchUnit);
    setLastQuery(query);
    clearError();

    switch (activeTab) {
      case 'current':
        fetchCurrentWeather(query, searchUnit);
        break;
      case 'forecast':
        fetchForecast(query, 7, searchUnit);
        break;
      case 'historical':
        fetchHistorical(query, historicalDate, searchUnit);
        break;
      case 'marine':
        // Parse lat,lon from query
        const [lat, lon] = query.split(',').map(s => parseFloat(s.trim()));
        if (!isNaN(lat) && !isNaN(lon)) {
          fetchMarine(lat, lon, searchUnit);
        }
        break;
      case 'location':
        searchLocation(query);
        break;
    }
  }, [activeTab, historicalDate, fetchCurrentWeather, fetchForecast, fetchHistorical, fetchMarine, searchLocation, clearError]);

  const handleHistoricalDateChange = useCallback((date: string) => {
    setHistoricalDate(date);
    if (lastQuery && activeTab === 'historical') {
      fetchHistorical(lastQuery, date, unit);
    }
  }, [lastQuery, activeTab, unit, fetchHistorical]);

  const handleLocationSelect = useCallback((location: string) => {
    setActiveTab('current');
    setLastQuery(location);
    fetchCurrentWeather(location, unit);
  }, [unit, fetchCurrentWeather]);

  const handleTabChange = (tab: WeatherTab) => {
    setActiveTab(tab);
    clearError();
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={() => lastQuery && handleSearch(lastQuery, unit)} />;
    }

    switch (activeTab) {
      case 'current':
        return currentData ? (
          <CurrentWeatherCard data={currentData} unit={unit} />
        ) : (
          <EmptyState tab="current" />
        );
      case 'forecast':
        return forecastData ? (
          <ForecastCard data={forecastData} unit={unit} />
        ) : (
          <EmptyState tab="forecast" />
        );
      case 'historical':
        return historicalData ? (
          <HistoricalCard 
            data={historicalData} 
            unit={unit} 
            onDateChange={handleHistoricalDateChange}
          />
        ) : (
          <EmptyState tab="historical" />
        );
      case 'marine':
        return marineData ? (
          <MarineCard data={marineData} unit={unit} />
        ) : (
          <EmptyState tab="marine" />
        );
      case 'location':
        return locationData ? (
          <LocationSearchCard data={locationData} onLocationSelect={handleLocationSelect} />
        ) : (
          <EmptyState tab="location" />
        );
      default:
        return <EmptyState tab="current" />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header 
        style={{ 
          padding: '1.5rem 2rem',
          borderBottom: '1px solid var(--glass-border)',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Cloud size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>WeatherStack</h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Professional Weather Data</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Github size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Tabs */}
          <div 
            style={{ 
              display: 'flex', 
              gap: '0.5rem',
              marginBottom: '2rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem'
            }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={isActive ? 'tab-button active' : 'tab-button'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <SearchBar 
              activeTab={activeTab}
              onSearch={handleSearch}
              loading={loading}
            />
          </div>

          {/* Historical Date Picker (only for historical tab) */}
          {activeTab === 'historical' && (
            <div style={{ marginBottom: '2rem' }}>
              <HistoricalDatePicker
                selectedDate={historicalDate}
                onDateChange={handleHistoricalDateChange}
              />
            </div>
          )}

          {/* Content */}
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer 
        style={{ 
          padding: '1.5rem 2rem',
          borderTop: '1px solid var(--glass-border)',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          marginTop: 'auto'
        }}
      >
        <div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Powered by WeatherStack API
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} WeatherStack App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
