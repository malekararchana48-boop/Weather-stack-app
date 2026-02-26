import React from 'react';
import { CloudSun, Search, MapPin, History, Waves, Compass } from 'lucide-react';
import type { WeatherTab } from '../types/weather';

interface EmptyStateProps {
  activeTab: WeatherTab;
}

const tabContent: Record<WeatherTab, { icon: React.ReactNode; title: string; description: string }> = {
  current: {
    icon: <CloudSun size={64} style={{ color: 'var(--accent-warm)' }} />,
    title: 'Current Weather',
    description: 'Search for a location to see the current weather conditions including temperature, humidity, wind, and more.',
  },
  forecast: {
    icon: <Compass size={64} style={{ color: 'var(--accent-cool)' }} />,
    title: 'Weather Forecast',
    description: 'Get up to 14 days of weather forecast with hourly breakdowns for any location worldwide.',
  },
  historical: {
    icon: <History size={64} style={{ color: 'rgba(139, 92, 246, 0.9)' }} />,
    title: 'Historical Weather',
    description: 'Access historical weather data for any date. Great for research and planning.',
  },
  marine: {
    icon: <Waves size={64} style={{ color: 'var(--accent-success)' }} />,
    title: 'Marine Weather',
    description: 'Get detailed marine weather information including wave height, swell conditions, and water temperature.',
  },
  location: {
    icon: <MapPin size={64} style={{ color: 'var(--accent-danger)' }} />,
    title: 'Location Search',
    description: 'Search and discover locations worldwide. Find coordinates, timezone information, and more.',
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({ activeTab }) => {
  const content = tabContent[activeTab];

  return (
    <div
      className="glass-card fade-in"
      style={{
        padding: '64px 48px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      <div
        style={{
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '24px',
        }}
      >
        {content.icon}
      </div>
      <div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px' }}>
          {content.title}
        </h3>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: '400px',
            lineHeight: 1.6,
          }}
        >
          {content.description}
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '16px',
          padding: '12px 24px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
        }}
      >
        <Search size={18} />
        <span>Enter a location above to get started</span>
      </div>
    </div>
  );
};
