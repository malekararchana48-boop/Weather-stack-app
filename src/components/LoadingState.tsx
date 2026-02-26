import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading weather data...' 
}) => {
  return (
    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
      <div className="loading-spinner" style={{ margin: '0 auto 1.5rem' }} />
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
        {message}
      </p>
    </div>
  );
};

export default LoadingState;
