import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import type { ForecastResponse, ForecastDay } from '../types/weather';
import { WeatherIcon, Droplets, Wind, Navigation } from './WeatherIcon';
import { getUnitSymbol } from '../services/weatherApi';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ForecastCardProps {
  data: ForecastResponse;
  unit: 'm' | 'f' | 's';
}

interface DayCardProps {
  day: ForecastDay;
  units: { temp: string; speed: string; pressure: string };
  isExpanded: boolean;
  onToggle: () => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, units, isExpanded, onToggle }) => {
  const date = parseISO(day.date);
  const avgHour = day.hourly[Math.floor(day.hourly.length / 2)];

  return (
    <div
      className="glass-card"
      style={{
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onClick={onToggle}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'center', minWidth: '60px' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {format(date, 'EEE')}
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {format(date, 'd')}
            </p>
          </div>
          <WeatherIcon
            code={avgHour.weather_code}
            size={48}
          />
          <div>
            <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>
              {avgHour.weather_descriptions[0]}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {day.hourly.filter(h => h.chanceofrain > 50).length > 0 && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Droplets size={14} />
                  Rain expected
                </span>
              )}
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontWeight: 300 }}>
            <span style={{ color: 'var(--text-primary)' }}>{Math.round(day.maxtemp)}°</span>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-secondary)' }}>{Math.round(day.mintemp)}°</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', color: 'var(--text-muted)' }}>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="slide-in" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Average Temp</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{day.avgtemp}{units.temp}</p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>UV Index</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{day.uv_index}</p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Sun Hours</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{day.sunhour}h</p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Moon Phase</p>
              <p style={{ fontSize: '1rem', fontWeight: 600 }}>{day.astro.moon_phase}</p>
            </div>
          </div>

          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Hourly Forecast
          </h4>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
            {day.hourly.map((hour, index) => (
              <div
                key={index}
                style={{
                  minWidth: '100px',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {hour.time}
                </p>
                <WeatherIcon code={hour.weather_code} size={32} />
                <p style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '8px' }}>
                  {hour.temperature}°
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <Droplets size={12} />
                  {hour.chanceofrain}%
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <Wind size={12} />
                  {hour.wind_speed}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ForecastCard: React.FC<ForecastCardProps> = ({ data, unit }) => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const units = getUnitSymbol(unit);
  const { location, forecast } = data;

  const forecastDays = Object.values(forecast);

  const toggleDay = (date: string) => {
    setExpandedDay(expandedDay === date ? null : date);
  };

  return (
    <div className="fade-in">
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '4px' }}>
          Weather Forecast
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          {location.name}, {location.country}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '4px' }}>
          {forecastDays.length} days forecast
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {forecastDays.map((day) => (
          <DayCard
            key={day.date}
            day={day}
            units={units}
            isExpanded={expandedDay === day.date}
            onToggle={() => toggleDay(day.date)}
          />
        ))}
      </div>
    </div>
  );
};
