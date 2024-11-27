import React from 'react';
import { CalendarEvent, ViewMode } from '../../types/calendar';
import { EventCard } from './EventCard';
import { format, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

interface CalendarGridProps {
  events: CalendarEvent[];
  viewMode: ViewMode;
  currentDate: Date;
}

export function CalendarGrid({ events, viewMode, currentDate }: CalendarGridProps) {
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

  const getDayEvents = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.start), date));
  };

  if (viewMode === 'month') {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    // Add padding days to start of month
    const startDay = start.getDay();
    const paddingDaysBefore = Array.from({ length: startDay }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() - (startDay - i));
      return d;
    });

    // Add padding days to end of month
    const endDay = end.getDay();
    const paddingDaysAfter = Array.from({ length: 6 - endDay }, (_, i) => {
      const d = new Date(end);
      d.setDate(d.getDate() + (i + 1));
      return d;
    });

    const allDays = [...paddingDaysBefore, ...days, ...paddingDaysAfter];

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200 flex-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-white p-2 text-sm font-medium text-gray-700">
            {day}
          </div>
        ))}
        {allDays.map((date, index) => (
          <div
            key={date.toISOString()}
            className={`min-h-[120px] bg-white p-2 ${
              !isSameMonth(date, currentDate) ? 'text-gray-400' : ''
            }`}
          >
            <div className="font-medium mb-2">{format(date, 'd')}</div>
            <div className="space-y-1">
              {getDayEvents(date).map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-1 gap-4 p-4">
      {hours.map(hour => (
        <div key={hour} className="flex items-start gap-4">
          <div className="w-20 text-right text-sm text-gray-500">
            {hour}:00
          </div>
          <div className="flex-1 min-h-[60px] border-t pt-2">
            {events
              .filter(event => new Date(event.start).getHours() === hour)
              .map(event => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}