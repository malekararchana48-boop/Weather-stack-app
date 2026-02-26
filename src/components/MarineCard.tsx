import React from 'react';
import { Waves, Wind, Thermometer, Navigation, Droplets, Sun } from 'lucide-react';
import type { MarineWeatherResponse, UnitType } from '../types/weather';

interface MarineCardProps {
  data: MarineWeatherResponse;
  unit: UnitType;
}

const getUnitSymbol = (unit: UnitType): string => {
  switch (unit) {
    case 'f': return '°F';
    case 's': return 'K';
    default: return '°C';
  }
};

const getSpeedUnit = (unit: UnitType): string => {
  switch (unit) {
    case 'f': return 'mph';
    case 's': return 'km/h';
    default: return 'km/h';
  }
};

export const MarineCard: React.FC<MarineCardProps> = ({ data, unit }) => {
  const { location, current } = data;
  const unitSymbol = getUnitSymbol(unit);
  const speedUnit = getSpeedUnit(unit);

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="location-name">Marine Conditions</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          {location.name}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Lat: {location.lat}, Lon: {location.lon}
        </p>
      </div>

      {/* Main Marine Stats */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        {/* Water Temperature */}
        <div 
          style={{ 
            padding: '1.5rem', 
            background: 'var(--glass-bg-light)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}
        >
          <Thermometer size={32} color="var(--accent-cyan)" style={{ marginBottom: '0.75rem' }} />
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
            Water Temperature
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 600 }}>
            {current.water_temperature}{unitSymbol}
          </div>
        </div>

        {/* Swell Height */}
        <div 
          style={{ 
            padding: '1.5rem', 
            background: 'var(--glass-bg-light)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}
        >
          <Waves size={32} color="var(--accent-blue)" style={{ marginBottom: '0.75rem' }} />
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
            Swell Height
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 600 }}>
            {current.swell_height} m
          </div>
        </div>

        {/* Swell Period */}
        <div 
          style={{ 
            padding: '1.5rem', 
            background: 'var(--glass-bg-light)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}
        >
          <Wind size={32} color="var(--accent-teal)" style={{ marginBottom: '0.75rem' }} />
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
            Swell Period
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 600 }}>
            {current.swell_period} s
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-item">
          <Navigation 
            size={20} 
            color="var(--accent-amber)" 
            style={{ 
              marginBottom: '0.5rem',
              transform: `rotate(${current.swell_direction}deg)`
            }} 
          />
          <div className="stat-label">Swell Direction</div>
          <div className="stat-value">{current.swell_direction}°</div>
        </div>

        <div className="stat-item">
          <Wind size={20} color="var(--accent-cyan)" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-label">Wind Speed</div>
          <div className="stat-value">{current.wind_speed} {speedUnit}</div>
        </div>

        <div className="stat-item">
          <Navigation 
            size={20} 
            color="var(--accent-purple)" 
            style={{ 
              marginBottom: '0.5rem',
              transform: `rotate(${current.wind_degree}deg)`
            }} 
          />
          <div className="stat-label">Wind Direction</div>
          <div className="stat-value">{current.wind_dir}</div>
        </div>

        <div className="stat-item">
          <Droplets size={20} color="var(--accent-blue-light)" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-label">Humidity</div>
          <div className="stat-value">{current.humidity}%</div>
        </div>

        <div className="stat-item">
          <Thermometer size={20} color="var(--accent-rose)" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-label">Air Temp</div>
          <div className="stat-value">{current.temperature}{unitSymbol}</div>
        </div>

        <div className="stat-item">
          <Sun size={20} color="var(--weather-sunny)" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-label">UV Index</div>
          <div className="stat-value">{current.uv_index}</div>
        </div>
      </div>

      {/* Tide Information (if available) */}
      {current.tide_height !== undefined && (
        <div 
          style={{ 
            padding: '1.5rem', 
            background: 'var(--glass-bg-light)',
            borderRadius: 'var(--radius-lg)',
            marginTop: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Waves size={24} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Tide Information</h3>
          </div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Tide Height</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{current.tide_height} m</div>
            </div>
            {current.tide_direction && (
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Direction</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{current.tide_direction}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarineCard;
