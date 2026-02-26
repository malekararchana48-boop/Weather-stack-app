import React, { useState } from 'react';
import { format, subDays } from 'date-fns';
import { Calendar, Wind, Droplets, Gauge, Thermometer, History } from 'lucide-react';
import type { HistoricalWeatherResponse, UnitType } from '../types/weather';

interface HistoricalCardProps {
  data: HistoricalWeatherResponse;
  unit: UnitType;
  onDateChange: (date: string) => void;
}

const getUnitSymbol = (unit: UnitType): string => {
  switch (unit) {
    case 'f': return '°F';
    case 's': return 'K';
    default: return '°C';
  }
};

export const HistoricalCard: React.FC<HistoricalCardProps> = ({ 
  data, 
  unit, 
  onDateChange 
}) => {
  const { location, historical } = data;
  const unitSymbol = getUnitSymbol(unit);
  
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
  // Get the first historical day (there should be only one for single date query)
  const historicalDay = Object.values(historical)[0];
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  const maxDate = format(new Date(), 'yyyy-MM-dd');
  const minDate = format(subDays(new Date(), 365), 'yyyy-MM-dd');

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="location-name">{location.name}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          Historical Weather Data
        </p>
      </div>

      {/* Date Selector */}
      <div 
        style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem', 
          background: 'var(--glass-bg-light)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}
      >
        <History size={24} color="var(--accent-purple)" />
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label 
            style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              color: 'var(--text-muted)', 
              marginBottom: '0.5rem' 
            }}
          >
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={minDate}
            max={maxDate}
            className="glass-input"
          />
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Data available for past year
        </div>
      </div>

      {historicalDay && (
        <>
          {/* Date Display */}
          <div 
            style={{ 
              marginBottom: '2rem', 
              textAlign: 'center',
              padding: '1rem',
              background: 'var(--glass-bg-light)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <Calendar size={20} style={{ marginBottom: '0.5rem', color: 'var(--accent-blue)' }} />
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
              {format(parseInt(historicalDay.date) * 1000, 'EEEE, MMMM d, yyyy')}
            </div>
          </div>

          {/* Temperature Summary */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '3rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                High
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--accent-rose)' }}>
                {Math.round(historicalDay.maxtemp)}{unitSymbol}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Average
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 600 }}>
                {Math.round(historicalDay.avgtemp)}{unitSymbol}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Low
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                {Math.round(historicalDay.mintemp)}{unitSymbol}
              </div>
            </div>
          </div>

          {/* Hourly Data Summary */}
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Day Summary
            </h3>
            
            <div className="stats-grid">
              <div className="stat-item">
                <Wind size={20} color="var(--accent-cyan)" style={{ marginBottom: '0.5rem' }} />
                <div className="stat-label">Avg Wind</div>
                <div className="stat-value">
                  {Math.round(historicalDay.hourly.reduce((acc, h) => acc + h.wind_speed, 0) / historicalDay.hourly.length)} km/h
                </div>
              </div>

              <div className="stat-item">
                <Droplets size={20} color="var(--accent-blue-light)" style={{ marginBottom: '0.5rem' }} />
                <div className="stat-label">Avg Humidity</div>
                <div className="stat-value">
                  {Math.round(historicalDay.hourly.reduce((acc, h) => acc + h.humidity, 0) / historicalDay.hourly.length)}%
                </div>
              </div>

              <div className="stat-item">
                <Gauge size={20} color="var(--accent-amber)" style={{ marginBottom: '0.5rem' }} />
                <div className="stat-label">Sun Hours</div>
                <div className="stat-value">{historicalDay.sunhour}h</div>
              </div>

              <div className="stat-item">
                <Thermometer size={20} color="var(--accent-rose)" style={{ marginBottom: '0.5rem' }} />
                <div className="stat-label">UV Index</div>
                <div className="stat-value">{historicalDay.uv_index}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoricalCard;
