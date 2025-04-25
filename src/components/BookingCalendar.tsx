import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css'; 

type BookingCalendarProps = {
  onDateSelect?: (date: Date) => void;
  defaultValue?: Date | string | null;
};

function BookingCalendar({ onDateSelect, defaultValue = null }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Initialize with defaultValue if provided
  useEffect(() => {
    if (defaultValue) {
      // Make sure we're creating a new date without timezone issues
      const initialDate = typeof defaultValue === 'string' 
        ? parseISODate(defaultValue)
        : defaultValue;
      
      setSelectedDate(initialDate);
    }
  }, [defaultValue]);

  // Parse ISO date string and create a date at 12:00 noon to avoid timezone issues
  const parseISODate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day, 12, 0, 0);
  };

  // Let TypeScript infer the correct types from react-calendar
  const handleDateSelect = (value: any) => {
    if (value instanceof Date) {
      // Use the date at noon to avoid timezone issues
      const adjustedDate = new Date(
        value.getFullYear(),
        value.getMonth(),
        value.getDate(),
        12, 0, 0
      );
      
      setSelectedDate(adjustedDate);
      if (onDateSelect) onDateSelect(adjustedDate);
    }
  };

  // Custom tile content to ensure correct display
  const tileContent = ({ date, view }: { date: Date; view: string }) => null;

  return (
    <div className="bg-white rounded-xl w-full">
      <Calendar
        onChange={handleDateSelect}
        value={selectedDate}
        minDate={new Date()}
        className="mx-auto"
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        tileDisabled={({ date }) => date.getDay() === 0} // Disable Sundays
        tileContent={tileContent}
      />
      
      {selectedDate && (
        <div className="mt-4 text-center text-gray-600">
          Selected Date: {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      )}
    </div>
  );
}

export default BookingCalendar; 