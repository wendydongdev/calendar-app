import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Download, Search } from 'lucide-react';
import { ViewMode } from '../../types/calendar';

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigate: (direction: 'prev' | 'next' | 'today') => void;
}

export function CalendarHeader({ currentDate, viewMode, onViewModeChange, onNavigate }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <CalendarIcon className="w-8 h-8 text-gray-700" />
          <h1 className="text-2xl font-semibold ml-2">Calendar</h1>
        </div>
        
        <div className="flex items-center gap-2 ml-8">
          <button onClick={() => onNavigate('prev')} className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => onNavigate('today')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
            Today
          </button>
          <button onClick={() => onNavigate('next')} className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="ml-4 text-lg font-medium">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['month', 'week', 'day'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`px-4 py-1 rounded-md text-sm ${
                viewMode === mode ? 'bg-white shadow' : 'hover:bg-gray-200'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            New Event
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}