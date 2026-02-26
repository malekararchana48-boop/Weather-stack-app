import React from 'react';
import { MapPin, Globe, Clock, Navigation } from 'lucide-react';
import type { LocationSearchResponse } from '../types/weather';

interface LocationSearchCardProps {
  data: LocationSearchResponse;
  onLocationSelect?: (location: string) => void;
}

export const LocationSearchCard: React.FC<LocationSearchCardProps> = ({ 
  data, 
  onLocationSelect 
}) => {
  const { results } = data;

  if (!results || results.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
        <MapPin size={48} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <p style={{ color: 'var(--text-muted)' }}>No locations found</p>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="location-name">Search Results</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          Found {results.length} location{results.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Results List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {results.map((location, index) => (
          <div
            key={`${location.name}-${location.lat}-${location.lon}`}
            style={{
              padding: '1.5rem',
              background: 'var(--glass-bg-light)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--glass-border)',
              transition: 'all var(--transition-fast)',
              cursor: onLocationSelect ? 'pointer' : 'default',
            }}
            onClick={() => onLocationSelect?.(location.name)}
            onMouseEnter={(e) => {
              if (onLocationSelect) {
                e.currentTarget.style.borderColor = 'var(--glass-border-strong)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              {/* Index Number */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--accent-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </div>

              {/* Location Info */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  {location.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  {location.region}{location.region ? ', ' : ''}{location.country}
                </p>

                {/* Details Grid */}
                <div 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '0.75rem',
                    marginTop: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Navigation size={14} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {location.lat}, {location.lon}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={14} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {location.timezone_id}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={14} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      UTC {location.utc_offset}
                    </span>
                  </div>
                </div>
              </div>

              {/* Select Button */}
              {onLocationSelect && (
                <button
                  className="glass-button-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onLocationSelect(location.name);
                  }}
                >
                  Select
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchCard;
