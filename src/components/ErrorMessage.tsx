import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div
      className="glass-card fade-in"
      style={{
        padding: '20px 24px',
        background: 'rgba(239, 68, 68, 0.15)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '10px' }}>
        <AlertCircle size={24} style={{ color: 'var(--accent-danger)' }} />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>
          Error
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {message}
        </p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
          }}
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};
