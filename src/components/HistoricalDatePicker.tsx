import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, subDays, addDays, isAfter, isBefore, startOfDay } from 'date-fns';

interface HistoricalDatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const HistoricalDatePicker: React.FC<HistoricalDatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const today = startOfDay(new Date());
  const oneYearAgo = subDays(today, 365);
  const selected = new Date(selectedDate);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value);
  };

  const goToPreviousDay = () => {
    const previousDay = subDays(selected, 1);
    if (!isBefore(previousDay, oneYearAgo)) {
      onDateChange(format(previousDay, 'yyyy-MM-dd'));
    }
  };

  const goToNextDay = () => {
    const nextDay = addDays(selected, 1);
    if (!isAfter(nextDay, today)) {
      onDateChange(format(nextDay, 'yyyy-MM-dd'));
    }
  };

  const canGoBack = !isBefore(subDays(selected, 1), oneYearAgo);
  const canGoForward = !isAfter(addDays(selected, 1), today);

  return (
    <div className="glass-card-light" style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Calendar size={20} color="var(--text-muted)" />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={goToPreviousDay}
            disabled={!canGoBack}
            style={{
              padding: '0.5rem',
              background: canGoBack ? 'var(--glass-bg)' : 'transparent',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-md)',
              cursor: canGoBack ? 'pointer' : 'not-allowed',
              opacity: canGoBack ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={format(oneYearAgo, 'yyyy-MM-dd')}
            max={format(today, 'yyyy-MM-dd')}
            className="glass-input"
            style={{ width: 'auto' }}
          />

          <button
            onClick={goToNextDay}
            disabled={!canGoForward}
            style={{
              padding: '0.5rem',
              background: canGoForward ? 'var(--glass-bg)' : 'transparent',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-md)',
              cursor: canGoForward ? 'pointer' : 'not-allowed',
              opacity: canGoForward ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {format(selected, 'EEEE, MMMM d, yyyy')}
        </span>
      </div>
    </div>
  );
};

export default HistoricalDatePicker;
