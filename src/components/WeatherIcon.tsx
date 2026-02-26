import React from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Moon,
  CloudMoon,
  CloudSun,
  Wind,
  type LucideIcon,
} from 'lucide-react';

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  size?: number;
  className?: string;
}

// WeatherStack weather codes mapping to icons
const getWeatherIcon = (code: number, isDay: boolean = true): LucideIcon => {
  // Sunny/Clear
  if (code === 113) {
    return isDay ? Sun : Moon;
  }
  
  // Partly cloudy
  if (code === 116) {
    return isDay ? CloudSun : CloudMoon;
  }
  
  // Cloudy
  if ([119, 122].includes(code)) {
    return Cloud;
  }
  
  // Fog/Mist/Haze
  if ([143, 248, 260].includes(code)) {
    return CloudFog;
  }
  
  // Drizzle/Light rain
  if ([176, 185, 263, 266, 281, 293, 296, 299, 302].includes(code)) {
    return CloudRain;
  }
  
  // Heavy rain
  if ([305, 308, 311, 314, 317, 320, 323, 326].includes(code)) {
    return CloudRain;
  }
  
  // Thunderstorm
  if ([386, 389, 392, 395].includes(code)) {
    return CloudLightning;
  }
  
  // Snow
  if ([179, 182, 227, 230, 329, 332, 335, 338, 350, 353, 356, 359, 362, 365, 368, 371, 374, 377].includes(code)) {
    return CloudSnow;
  }
  
  // Wind/Blizzard
  if ([200].includes(code)) {
    return Wind;
  }
  
  // Default
  return isDay ? CloudSun : CloudMoon;
};

const getWeatherColor = (code: number): string => {
  // Sunny
  if (code === 113) return '#fbbf24';
  
  // Partly cloudy
  if (code === 116) return '#94a3b8';
  
  // Cloudy
  if ([119, 122].includes(code)) return '#64748b';
  
  // Fog
  if ([143, 248, 260].includes(code)) return '#94a3b8';
  
  // Rain
  if ([176, 185, 263, 266, 281, 293, 296, 299, 302, 305, 308, 311, 314].includes(code)) {
    return '#60a5fa';
  }
  
  // Thunderstorm
  if ([386, 389, 392, 395].includes(code)) return '#8b5cf6';
  
  // Snow
  if ([179, 182, 227, 230, 329, 332, 335, 338, 350].includes(code)) {
    return '#e2e8f0';
  }
  
  return '#94a3b8';
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  isDay = true,
  size = 32,
  className = '',
}) => {
  const Icon = getWeatherIcon(code, isDay);
  const color = getWeatherColor(code);
  
  return (
    <div 
      className={`weather-icon-container ${className}`}
      style={{ 
        width: size * 2, 
        height: size * 2,
        background: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.15)`,
      }}
    >
      <Icon size={size} color={color} strokeWidth={1.5} />
    </div>
  );
};

export default WeatherIcon;
