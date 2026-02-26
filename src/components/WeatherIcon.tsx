import React from 'react';
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudHail,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  Navigation,
  Sunrise,
  Sunset,
  Waves,
  Droplet,
  Snowflake,
  type LucideIcon,
} from 'lucide-react';

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  size?: number;
  className?: string;
}

const iconMap: { [key: number]: LucideIcon } = {
  113: Sun,
  116: CloudSun,
  119: Cloud,
  122: Cloud,
  143: CloudFog,
  176: CloudRain,
  179: CloudSnow,
  182: Snowflake,
  185: Snowflake,
  200: CloudLightning,
  227: CloudSnow,
  230: CloudSnow,
  248: CloudFog,
  260: CloudFog,
  263: CloudRain,
  266: CloudRain,
  281: Snowflake,
  284: Snowflake,
  293: CloudRain,
  296: CloudRain,
  299: CloudRain,
  302: CloudRain,
  305: CloudRain,
  308: CloudRain,
  311: Snowflake,
  314: Snowflake,
  317: Snowflake,
  320: Snowflake,
  323: CloudSnow,
  326: CloudSnow,
  329: CloudSnow,
  332: CloudSnow,
  335: CloudSnow,
  338: CloudSnow,
  350: CloudHail,
  353: CloudRain,
  356: CloudRain,
  359: CloudRain,
  362: Snowflake,
  365: Snowflake,
  368: CloudSnow,
  371: CloudSnow,
  374: CloudHail,
  377: CloudHail,
  386: CloudLightning,
  389: CloudLightning,
  392: CloudLightning,
  395: CloudLightning,
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  isDay = true,
  size = 48,
  className = '',
}) => {
  let Icon = iconMap[code] || Cloud;

  if (code === 113) {
    Icon = isDay ? Sun : Moon;
  } else if (code === 116) {
    Icon = isDay ? CloudSun : CloudMoon;
  }

  return <Icon size={size} className={className} />;
};

export const getWeatherIcon = (code: number, isDay: boolean = true): LucideIcon => {
  if (code === 113) return isDay ? Sun : Moon;
  if (code === 116) return isDay ? CloudSun : CloudMoon;
  return iconMap[code] || Cloud;
};

export {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudHail,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  Navigation,
  Sunrise,
  Sunset,
  Waves,
  Droplet,
};
