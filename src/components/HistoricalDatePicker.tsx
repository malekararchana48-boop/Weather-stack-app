import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, subDays, addDays, isAfter, isBefore, startOfDay } from 'date-fns';

interface HistoricalDatePickerProps {
  onDateSelect: (date: string) => void;
  selectedDate?: string;
}

export const HistoricalDatePicker: React.FC<HistoricalDatePickerProps> = ({
  onDateSelect,
  selectedDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfDay(new Date());
  const maxDate = subDays(today, 1);
  const minDate = subDays(today, 365);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isDateSelectable = (date: Date) => {
    return !isAfter(date, maxDate) && !isBefore(date, minDate);
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    );
  };

  const handleDateClick = (date: Date) => {
    if (isDateSelectable(date)) {
      onDateSelect(format(date, 'yyyy-MM-dd'));
    }
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="glass-button"
          style={{ padding: '8px' }}
        >
          <ChevronLeft size={20} />
        </button>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button
          type="button"
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="glass-button"
          style={{ padding: '8px' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '12px' }}>
        {weekDays.map((day) => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              padding: '8px',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
        {days.map((date, index) => (
          <button
            key={index}
            type="button"
            disabled={!date || !isDateSelectable(date)}
            onClick={() => date && handleDateClick(date)}
            style={{
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              border: 'none',
              background: date && isDateSelected(date)
                ? 'rgba(56, 189, 248, 0.3)'
                : 'transparent',
              color: date
                ? isDateSelectable(date)
                  ? isDateSelected(date)
                    ? 'var(--text-primary)'
                    : 'var(--text-secondary)'
                  : 'var(--text-muted)'
                : 'transparent',
              fontSize: '0.875rem',
              fontWeight: date && isDateSelected(date) ? 600 : 400,
              cursor: date && isDateSelectable(date) ? 'pointer' : 'default',
              opacity: date && !isDateSelectable(date) ? 0.3 : 1,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (date && isDateSelectable(date) && !isDateSelected(date)) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (date && !isDateSelected(date)) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {date ? date.getDate() : ''}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Available range: {format(minDate, 'MMM d, yyyy')} - {format(maxDate, 'MMM d, yyyy')}
        </p>
        {selectedDate && (
          <p style={{ fontSize: '0.875rem', marginTop: '8px' }}>
            Selected: <strong>{format(new Date(selectedDate), 'MMMM d, yyyy')}</strong>
          </p>
        )}
      </div>
    </div>
  );
};
