import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry 
}) => {
  return (
    <div className="error-container">
      <AlertCircle 
        size={40} 
        color="var(--accent-rose)" 
        style={{ margin: '0 auto 1rem' }} 
      />
      <div className="error-title">Something went wrong</div>
      <div className="error-message">{message}</div>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="glass-button-secondary"
          style={{ marginTop: '1rem' }}
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
