import React from 'react';
import { Video, MapPin, Clock } from 'lucide-react';
import { CalendarEvent } from '../../types/calendar';

interface EventCardProps {
  event: CalendarEvent;
}

export function EventCard({ event }: EventCardProps) {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div 
      className="p-3 rounded-lg shadow-sm border bg-white hover:shadow-md transition-shadow cursor-pointer"
      style={{ borderLeft: `4px solid ${event.color || '#3b82f6'}` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{event.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Clock className="w-4 h-4" />
            <span>
              {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {' - '}
              {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {event.hasRecording && <Video className="w-4 h-4 text-gray-400" />}
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[event.status]}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
      </div>

      {event.participants.length > 0 && (
        <div className="flex items-center mt-3 -space-x-2">
          {event.participants.map((participant, index) => (
            <img
              key={participant.id}
              src={participant.avatar}
              alt={participant.name}
              className="w-8 h-8 rounded-full border-2 border-white"
              title={participant.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}