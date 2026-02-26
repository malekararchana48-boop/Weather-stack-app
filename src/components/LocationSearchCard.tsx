import React from 'react';
import { format } from 'date-fns';
import type { LocationSearchResponse, LocationResult } from '../types/weather';
import { MapPin, Globe, Clock, Navigation } from 'lucide-react';

interface LocationSearchCardProps {
  data: LocationSearchResponse;
  onSelectLocation: (location: string) => void;
}

interface LocationItemProps {
  location: LocationResult;
  onSelect: (location: string) => void;
  index: number;
}

const LocationItem: React.FC<LocationItemProps> = ({ location, onSelect, index }) => {
  return (
    <div
      className="glass-card slide-in"
      style={{
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        animationDelay: `${index * 0.05}s`,
      }}
      onClick={() => onSelect(`${location.lat},${location.lon}`)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{ padding: '12px', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '12px', flexShrink: 0 }}>
          <MapPin size={24} style={{ color: 'var(--accent-cool)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '4px' }}>
            {location.name}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '8px' }}>
            {location.region}{location.region ? ', ' : ''}{location.country}
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Navigation size={14} />
              <span>{location.lat}, {location.lon}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Globe size={14} />
              <span>{location.timezone_id}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Clock size={14} />
              <span>UTC{location.utc_offset > '0' ? '+' : ''}{location.utc_offset}</span>
            </div>
          </div>
        </div>
        <div style={{ padding: '8px 16px', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500, color: 'var(--accent-cool)' }}>
          Select
        </div>
      </div>
    </div>
  );
};

export const LocationSearchCard: React.FC<LocationSearchCardProps> = ({ data, onSelectLocation }) => {
  const { request, results } = data;

  if (!results || results.length === 0) {
    return (
      <div className="glass-card fade-in" style={{ padding: '48px', textAlign: 'center' }}>
        <MapPin size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>
          No locations found
        </h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Try searching for a different city or location name
        </p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '4px' }}>
          Location Search Results
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Found {results.length} location{results.length !== 1 ? 's' : ''} for "{request.query}"
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {results.map((location, index) => (
          <LocationItem
            key={`${location.name}-${location.lat}-${location.lon}`}
            location={location}
            onSelect={onSelectLocation}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
