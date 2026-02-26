import React from 'react';
import { Cloud, Search, History, Waves, Navigation } from 'lucide-react';
import type { WeatherTab } from '../types/weather';

interface EmptyStateProps {
  tab: WeatherTab;
}

const tabConfig: Record<WeatherTab, { icon: React.ElementType; title: string; description: string }> = {
  current: {
    icon: Cloud,
    title: 'Search for a location',
    description: 'Enter a city name to see current weather conditions',
  },
  forecast: {
    icon: Search,
    title: 'Get weather forecast',
    description: 'Search for a location to see the 7-day forecast',
  },
  historical: {
    icon: History,
    title: 'View historical data',
    description: 'Select a location and date to see past weather',
  },
  marine: {
    icon: Waves,
    title: 'Check marine conditions',
    description: 'Enter coordinates to see marine weather data',
  },
  location: {
    icon: Navigation,
    title: 'Find a location',
    description: 'Search for cities and get location details',
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({ tab }) => {
  const config = tabConfig[tab];
  const Icon = config.icon;
  
  return (
    <div className="empty-state">
      <Icon className="empty-state-icon" size={80} strokeWidth={1} />
      <h3 className="empty-state-title">{config.title}</h3>
      <p className="empty-state-description">{config.description}</p>
    </div>
  );
};

export default EmptyState;
