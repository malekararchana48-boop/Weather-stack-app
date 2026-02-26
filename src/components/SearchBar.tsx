import React, { useState, useCallback } from 'react';
import { Search, MapPin, Thermometer } from 'lucide-react';
import type { UnitType, WeatherTab } from '../types/weather';

interface SearchBarProps {
  activeTab: WeatherTab;
  onSearch: (query: string, unit: UnitType) => void;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  activeTab,
  onSearch,
  loading = false,
}) => {
  const [query, setQuery] = useState('');
  const [unit, setUnit] = useState<UnitType>('m');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), unit);
    }
  }, [query, unit, onSearch]);

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'marine':
        return 'Enter latitude, longitude (e.g., 40.7128,-74.0060)';
      case 'location':
        return 'Search for cities, countries...';
      default:
        return 'Search for a city (e.g., London, New York)';
    }
  };

  const unitOptions: { value: UnitType; label: string }[] = [
    { value: 'm', label: '°C' },
    { value: 'f', label: '°F' },
    { value: 's', label: 'K' },
  ];

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <Search 
            size={20} 
            style={{ 
              position: 'absolute', 
              left: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={getPlaceholder()}
            className="glass-input"
            style={{ paddingLeft: '3rem' }}
            disabled={loading}
          />
          <MapPin 
            size={18} 
            style={{ 
              position: 'absolute', 
              right: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} 
          />
        </div>

        {/* Controls Row */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Unit Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Thermometer size={16} color="var(--text-muted)" />
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {unitOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setUnit(option.value)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: unit === option.value 
                      ? 'var(--accent-blue)' 
                      : 'var(--glass-bg-light)',
                    color: unit === option.value ? 'white' : 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="glass-button"
            style={{ marginLeft: 'auto' }}
          >
            {loading ? (
              <div 
                className="loading-spinner" 
                style={{ width: '16px', height: '16px', borderWidth: '2px' }} 
              />
            ) : (
              <>
                <Search size={18} />
                Search
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
