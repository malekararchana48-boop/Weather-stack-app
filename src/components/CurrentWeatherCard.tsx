import React from 'react';
import { Wind, Droplets, Eye, Gauge, Sunrise, Sunset, Thermometer } from 'lucide-react';
import { WeatherIcon } from './WeatherIcon';
import type { CurrentWeatherResponse, UnitType } from '../types/weather';

interface CurrentWeatherCardProps {
  data: CurrentWeatherResponse;
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

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ data, unit }) => {
  const { location, current } = data;
  const unitSymbol = getUnitSymbol(unit);
  const speedUnit = getSpeedUnit(unit);

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="location-name">{location.name}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          {location.region}, {location.country}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          {location.localtime}
        </p>
      </div>

      {/* Main Weather Display */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '2rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}
      >
        <WeatherIcon code={current.weather_code} size={48} />
        
        <div>
          <div className="temperature-display">
            {current.temperature}{unitSymbol}
          </div>
          <div className="weather-description">
            {current.weather_descriptions[0]}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Feels like {current.feelslike}{unitSymbol}
          </p>
        </div>
      </div>

      {/* Weather Stats Grid */}
      <div className="stats-grid">
        <div className="stat-item">
          <Wind size={20} color="var(--accent-cyan)" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-label">Wind</div>
          <div className="stat-value">{current.wind_speed} {speedUnit}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {current.wind_dir}
          </div>
        </div>

        <div className="stat-item">
          <Droplets size={20} color="var(--accent-blue-light)" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-label">Humidity</div>
          <div className="stat-value">{current.humidity}%</div>
        </div>

        <div className="stat-item">
          <Eye size={20} color="var(--accent-teal)" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-label">Visibility</div>
          <div className="stat-value">{current.visibility} km</div>
        </div>

        <div className="stat-item">
          <Gauge size={20} color="var(--accent-amber)" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-label">Pressure</div>
          <div className="stat-value">{current.pressure} mb</div>
        </div>

        <div className="stat-item">
          <Thermometer size={20} color="var(--accent-rose)" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-label">UV Index</div>
          <div className="stat-value">{current.uv_index}</div>
        </div>

        <div className="stat-item">
          <Droplets size={20} color="var(--accent-purple)" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-label">Precipitation</div>
          <div className="stat-value">{current.precip} mm</div>
        </div>
      </div>

      {/* Astro Data */}
      <div 
        style={{ 
          marginTop: '2rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--glass-border)',
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sunrise size={24} color="var(--weather-sunny)" />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sunrise</div>
            <div style={{ fontWeight: 600 }}>{current.astro.sunrise}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sunset size={24} color="var(--accent-orange)" />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sunset</div>
            <div style={{ fontWeight: 600 }}>{current.astro.sunset}</div>
          </div>
        </div>

        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cloud Cover</div>
          <div style={{ fontWeight: 600 }}>{current.cloudcover}%</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
