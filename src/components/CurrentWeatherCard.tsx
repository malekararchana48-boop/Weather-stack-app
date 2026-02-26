import React from 'react';
import { format } from 'date-fns';
import type { CurrentWeatherResponse } from '../types/weather';
import { WeatherIcon, Wind, Droplets, Gauge, Navigation, Sunrise, Sunset, Eye, Thermometer } from './WeatherIcon';
import { getUnitSymbol } from '../services/weatherApi';

interface CurrentWeatherCardProps {
  data: CurrentWeatherResponse;
  unit: 'm' | 'f' | 's';
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ data, unit }) => {
  const { location, current } = data;
  const units = getUnitSymbol(unit);
  const isDay = true;

  const formatTime = (timeStr: string) => {
    try {
      return format(new Date(`2000-01-01 ${timeStr}`), 'h:mm a');
    } catch {
      return timeStr;
    }
  };

  return (
    <div className="fade-in">
      <div className="glass-card" style={{ padding: '32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '4px' }}>
              {location.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              {location.region}, {location.country}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '8px' }}>
              {format(new Date(location.localtime), 'EEEE, MMMM d, yyyy • h:mm a')}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'flex-end' }}>
              <WeatherIcon
                code={current.weather_code}
                isDay={isDay}
                size={80}
                className={isDay ? 'pulse' : ''}
              />
              <div>
                <div style={{ fontSize: '4rem', fontWeight: 300, lineHeight: 1 }}>
                  {current.temperature}
                  <span style={{ fontSize: '2rem', fontWeight: 400 }}>{units.temp}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '4px' }}>
                  {current.weather_descriptions[0]}
                </p>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '8px' }}>
              Feels like {current.feelslike}{units.temp}
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
            Wind & Pressure
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '12px' }}>
                <Wind size={24} style={{ color: 'var(--accent-cool)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Wind Speed</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.wind_speed} {units.speed}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '12px' }}>
                <Navigation size={24} style={{ color: 'var(--accent-cool)', transform: `rotate(${current.wind_degree}deg)` }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Direction</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.wind_dir}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '12px' }}>
                <Gauge size={24} style={{ color: 'rgba(139, 92, 246, 0.9)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pressure</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.pressure} {units.pressure}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
            Atmosphere
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '12px' }}>
                <Droplets size={24} style={{ color: 'var(--accent-success)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Humidity</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.humidity}%</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '12px' }}>
                <Eye size={24} style={{ color: 'var(--accent-warning)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Visibility</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.visibility} km</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(251, 146, 60, 0.2)', borderRadius: '12px' }}>
                <Thermometer size={24} style={{ color: 'var(--accent-warm)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UV Index</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.uv_index}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
            Sun & Moon
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(251, 146, 60, 0.2)', borderRadius: '12px' }}>
                <Sunrise size={24} style={{ color: 'var(--accent-warm)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sunrise</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{formatTime(current.astro.sunrise)}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '12px' }}>
                <Sunset size={24} style={{ color: 'rgba(139, 92, 246, 0.9)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sunset</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{formatTime(current.astro.sunset)}</p>
              </div>
            </div>
            <div style={{ gridColumn: '1 / -1', padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Moon Phase</p>
              <p style={{ fontSize: '1rem', fontWeight: 500 }}>{current.astro.moon_phase}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Illumination: {current.astro.moon_illumination}%
              </p>
            </div>
          </div>
        </div>

        {current.air_quality && (
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
              Air Quality
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PM2.5</p>
                <p style={{ fontSize: '1rem', fontWeight: 600 }}>{current.air_quality['pm2_5']} µg/m³</p>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PM10</p>
                <p style={{ fontSize: '1rem', fontWeight: 600 }}>{current.air_quality.pm10} µg/m³</p>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ozone (O₃)</p>
                <p style={{ fontSize: '1rem', fontWeight: 600 }}>{current.air_quality.o3} ppb</p>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>EPA Index</p>
                <p style={{ fontSize: '1rem', fontWeight: 600 }}>{current.air_quality['us-epa-index']}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
