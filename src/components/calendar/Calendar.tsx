import React, { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { ViewMode, CalendarEvent } from '../../types/calendar';
import { addDays, setHours, setMinutes } from 'date-fns';

const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Sync Meeting',
    start: setMinutes(setHours(new Date(), 10), 0),
    end: setMinutes(setHours(new Date(), 11), 0),
    status: 'confirmed',
    type: 'call',
    participants: [
      { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=1' },
      { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=2' }
    ],
    location: 'Online',
    hasRecording: true,
    color: '#3b82f6'
  },
  {
    id: '2',
    title: 'Product Demo',
    start: setMinutes(setHours(addDays(new Date(), 1), 14), 0),
    end: setMinutes(setHours(addDays(new Date(), 1), 15), 0),
    status: 'pending',
    type: 'demo',
    participants: [
      { id: '3', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=3' }
    ],
    location: 'Conference Room A',
    color: '#10b981'
  }
];

export function Calendar() {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNavigate = (direction: 'prev' | 'next' | 'today') => {
    const newDate = new Date(currentDate);
    
    switch (direction) {
      case 'prev':
        if (viewMode === 'month') newDate.setMonth(currentDate.getMonth() - 1);
        else newDate.setDate(currentDate.getDate() - 1);
        break;
      case 'next':
        if (viewMode === 'month') newDate.setMonth(currentDate.getMonth() + 1);
        else newDate.setDate(currentDate.getDate() + 1);
        break;
      case 'today':
        newDate.setTime(new Date().getTime());
        break;
    }
    
    setCurrentDate(newDate);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNavigate={handleNavigate}
      />
      <div className="flex-1 overflow-auto">
        <CalendarGrid
          events={MOCK_EVENTS}
          viewMode={viewMode}
          currentDate={currentDate}
        />
      </div>
    </div>
  );
}