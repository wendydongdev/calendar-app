export type ViewMode = 'month' | 'week' | 'day';

export type EventStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export type EventType = 'call' | 'meeting' | 'demo' | 'workshop';

export interface Participant {
  id: string;
  name: string;
  avatar: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: EventStatus;
  type: EventType;
  participants: Participant[];
  location: string;
  hasRecording?: boolean;
  workflowStatus?: string;
  color?: string;
}