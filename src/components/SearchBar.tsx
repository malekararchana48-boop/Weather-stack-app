import React, { useState, useCallback, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import type { SearchFilters, WeatherTab } from '../types/weather';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  onTabChange: (tab: WeatherTab) => void;
  activeTab: WeatherTab;
  loading: boolean;
}

const tabs: { id: WeatherTab; label: string }[] = [
  { id: 'current', label: 'Current' },
  { id: 'forecast', label: 'Forecast' },
  { id: 'historical', label: 'Historical' },
  { id: 'marine', label: 'Marine' },
  { id: 'location', label: 'Location' },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ar', name: 'Arabic' },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onTabChange,
  activeTab,
  loading,
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    unit: 'm',
    language: 'en',
  });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), filters);
    }
  }, [query, filters, onSearch]);

  const handleFilterChange = useCallback(<K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowFilters(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <MapPin
              size={20}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a city, coordinates, or location..."
              className="glass-input"
              style={{
                width: '100%',
                paddingLeft: '48px',
                paddingRight: query ? '48px' : '20px',
              }}
              disabled={loading}
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`glass-button ${showFilters ? 'active' : ''}`}
            style={{
              background: showFilters
                ? 'rgba(255, 255, 255, 0.15)'
                : undefined,
            }}
          >
            <SlidersHorizontal size={20} />
            <span style={{ display: 'none' }}>@media (min-width: 640px) {{ display: 'inline' }}</span>
            <span className="filter-text">Filters</span>
          </button>
          <button
            type="submit"
            className="glass-button primary"
            disabled={loading || !query.trim()}
          >
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            borderBottom: '1px solid var(--glass-border)',
            paddingBottom: '16px',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`glass-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {showFilters && (
          <div
            className="slide-in"
            style={{
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid var(--glass-border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Unit System
              </label>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '4px',
                  borderRadius: '12px',
                }}
              >
                {[
                  { value: 'm', label: 'Metric', symbol: '°C' },
                  { value: 'f', label: 'Imperial', symbol: '°F' },
                  { value: 's', label: 'Scientific', symbol: 'K' },
                ].map((unit) => (
                  <button
                    key={unit.value}
                    type="button"
                    onClick={() => handleFilterChange('unit', unit.value as 'm' | 'f' | 's')}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: '10px',
                      border: 'none',
                      background: filters.unit === unit.value
                        ? 'rgba(56, 189, 248, 0.3)'
                        : 'transparent',
                      color: filters.unit === unit.value
                        ? 'var(--text-primary)'
                        : 'var(--text-secondary)',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {unit.label}
                    <span
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        opacity: 0.7,
                        marginTop: '2px',
                      }}
                    >
                      {unit.symbol}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Language
              </label>
              <select
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
                className="glass-input"
                style={{ width: '100%', cursor: 'pointer' }}
              >
                {languages.map((lang) => (
                  <option
                    key={lang.code}
                    value={lang.code}
                    style={{ background: '#1e1b4b', color: '#fff' }}
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
