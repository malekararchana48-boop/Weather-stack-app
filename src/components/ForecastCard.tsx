import React from 'react';
import { format, parseISO } from 'date-fns';
import { Wind, Droplets, Thermometer } from 'lucide-react';
import { WeatherIcon } from './WeatherIcon';
import type { ForecastWeatherResponse, UnitType } from '../types/weather';

interface ForecastCardProps {
  data: ForecastWeatherResponse;
  unit: UnitType;
}

const getUnitSymbol = (unit: UnitType): string => {
  switch (unit) {
    case 'f': return '°F';
    case 's': return 'K';
    default: return '°C';
  }
};

export const ForecastCard: React.FC<ForecastCardProps> = ({ data, unit }) => {
  const { location, forecast } = data;
  const unitSymbol = getUnitSymbol(unit);
  
  const forecastDays = Object.values(forecast).slice(0, 7);

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="location-name">{location.name}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          7-Day Weather Forecast
        </p>
      </div>

      {/* Forecast List */}
      <div className="forecast-list">
        {forecastDays.map((day, index) => {
          const date = parseISO(day.date);
          const isToday = index === 0;
          
          return (
            <div 
              key={day.date} 
              className="forecast-item"
              style={{
                background: isToday ? 'var(--glass-bg)' : 'var(--glass-bg-light)',
                border: isToday ? '1px solid var(--glass-border-strong)' : '1px solid transparent',
              }}
            >
              {/* Date */}
              <div style={{ minWidth: '80px' }}>
                <div style={{ fontWeight: 600 }}>
                  {isToday ? 'Today' : format(date, 'EEE')}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {format(date, 'MMM d')}
                </div>
              </div>

              {/* Weather Icon & Description */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                <WeatherIcon 
                  code={day.hourly[0]?.weather_code || 113} 
                  size={20}
                  className="small"
                />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {day.hourly[0]?.weather_descriptions[0] || 'Clear'}
                </span>
              </div>

              {/* Temperature Range */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '100px' }}>
                <Thermometer size={16} color="var(--accent-rose)" />
                <span style={{ fontWeight: 600 }}>
                  {Math.round(day.maxtemp)}{unitSymbol}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>/</span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {Math.round(day.mintemp)}{unitSymbol}
                </span>
              </div>

              {/* Wind */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem',
                  minWidth: '80px',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)'
                }}
              >
                <Wind size={14} />
                {day.hourly[0]?.wind_speed || 0} km/h
              </div>

              {/* Humidity */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem',
                  minWidth: '60px',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)'
                }}
              >
                <Droplets size={14} />
                {day.hourly[0]?.humidity || 0}%
              </div>

              {/* UV Index */}
              <div 
                style={{ 
                  minWidth: '60px',
                  textAlign: 'right',
                  fontSize: '0.875rem'
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>UV </span>
                <span style={{ fontWeight: 600 }}>{day.uv_index}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
