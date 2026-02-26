import React from 'react';
import { format } from 'date-fns';
import type { MarineResponse } from '../types/weather';
import { WeatherIcon, Waves, Wind, Navigation, Droplet, Thermometer } from './WeatherIcon';
import { getUnitSymbol } from '../services/weatherApi';

interface MarineCardProps {
  data: MarineResponse;
  unit: 'm' | 'f' | 's';
}

export const MarineCard: React.FC<MarineCardProps> = ({ data, unit }) => {
  const { location, current } = data;
  const units = getUnitSymbol(unit);

  return (
    <div className="fade-in">
      <div className="glass-card" style={{ padding: '32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '4px' }}>
              Marine Weather
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              {location.name}, {location.country}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '8px' }}>
              {format(new Date(location.localtime), 'EEEE, MMMM d, yyyy • h:mm a')}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'flex-end' }}>
              <Waves size={64} style={{ color: 'var(--accent-cool)' }} />
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 300, lineHeight: 1 }}>
                  {current.water_temperature}
                  <span style={{ fontSize: '1.5rem', fontWeight: 400 }}>{units.temp}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '4px' }}>
                  Water Temperature
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
            Wave Conditions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '12px' }}>
                <Waves size={24} style={{ color: 'var(--accent-cool)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Wave Height</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.wave_height} m</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '12px' }}>
                <Navigation size={24} style={{ color: 'var(--accent-cool)', transform: `rotate(${current.wave_direction === 'N' ? 0 : current.wave_direction === 'E' ? 90 : current.wave_direction === 'S' ? 180 : 270}deg)` }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Wave Direction</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.wave_direction}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '12px' }}>
                <Waves size={24} style={{ color: 'rgba(139, 92, 246, 0.9)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Wave Period</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.wave_period} s</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
            Swell Conditions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '12px' }}>
                <Waves size={24} style={{ color: 'var(--accent-success)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Swell Height</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.swell_height} m</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '12px' }}>
                <Navigation size={24} style={{ color: 'var(--accent-success)', transform: `rotate(${current.swell_direction === 'N' ? 0 : current.swell_direction === 'E' ? 90 : current.swell_direction === 'S' ? 180 : 270}deg)` }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Swell Direction</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.swell_direction}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '12px' }}>
                <Waves size={24} style={{ color: 'var(--accent-warning)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Swell Period</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.swell_period} s</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
            Weather Conditions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(251, 146, 60, 0.2)', borderRadius: '12px' }}>
                <WeatherIcon code={current.weather_code} size={24} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Condition</p>
                <p style={{ fontSize: '1rem', fontWeight: 600 }}>{current.weather_descriptions[0]}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(251, 146, 60, 0.2)', borderRadius: '12px' }}>
                <Thermometer size={24} style={{ color: 'var(--accent-warm)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Air Temp</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.temperature}{units.temp}</p>
              </div>
            </div>
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
              <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '12px' }}>
                <Droplet size={24} style={{ color: 'var(--accent-success)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Humidity</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.humidity}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
            Visibility & Pressure
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '12px' }}>
                <Thermometer size={24} style={{ color: 'rgba(139, 92, 246, 0.9)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Visibility</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.visibility} km</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '12px' }}>
                <Thermometer size={24} style={{ color: 'rgba(139, 92, 246, 0.9)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pressure</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.pressure} {units.pressure}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '12px' }}>
                <Thermometer size={24} style={{ color: 'var(--accent-warning)' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UV Index</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.uv_index}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
