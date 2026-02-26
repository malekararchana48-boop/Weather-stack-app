import React from 'react';
import { Cloud } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading weather data...' }) => {
  return (
    <div
      className="glass-card fade-in"
      style={{
        padding: '48px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      <div style={{ position: 'relative' }}>
        <Cloud
          size={64}
          style={{
            color: 'var(--accent-cool)',
            animation: 'float 3s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            border: '3px solid rgba(56, 189, 248, 0.2)',
            borderTopColor: 'var(--accent-cool)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>
      <div>
        <p style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '8px' }}>
          {message}
        </p>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Please wait while we fetch the latest data
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};
