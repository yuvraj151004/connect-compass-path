
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Video, 
  MapPin,
  MessageSquare
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Session {
  id: string;
  mentor: {
    id: string;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  topic: string;
  type: 'video' | 'in-person' | 'chat';
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

const Schedule = () => {
  // For a real app, you'd use a proper date picker and calendar library
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<'week' | 'month' | 'list'>('week');
  
  // Sample data - in a real app, this would come from an API
  const sessions: Session[] = [
    {
      id: '1',
      mentor: {
        id: '1',
        name: 'Sarah Johnson'
      },
      date: '2025-04-15',
      startTime: '14:00',
      endTime: '15:00',
      duration: 60,
      topic: 'Career Development Discussion',
      type: 'video',
      status: 'upcoming'
    },
    {
      id: '2',
      mentor: {
        id: '2',
        name: 'Michael Chen'
      },
      date: '2025-04-18',
      startTime: '10:30',
      endTime: '11:15',
      duration: 45,
      topic: 'Technical Interview Preparation',
      type: 'video',
      status: 'upcoming'
    },
    {
      id: '3',
      mentor: {
        id: '1',
        name: 'Sarah Johnson'
      },
      date: '2025-04-22',
      startTime: '13:00',
      endTime: '14:00',
      duration: 60,
      topic: 'Resume Review Session',
      type: 'video',
      status: 'upcoming'
    },
    {
      id: '4',
      mentor: {
        id: '3',
        name: 'Alex Rivera'
      },
      date: '2025-04-05',
      startTime: '11:00',
      endTime: '12:00',
      duration: 60,
      topic: 'Portfolio Critique',
      type: 'in-person',
      status: 'completed',
      notes: 'Discussed improvements for the UX portfolio case studies.'
    }
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  // Navigate between weeks/months
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  // Get session type icon
  const getSessionTypeIcon = (type: Session['type']) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'in-person':
        return <MapPin className="h-4 w-4" />;
      case 'chat':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  // Filter sessions based on view
  const getFilteredSessions = () => {
    // For a real app, you would filter based on the current date and view
    return sessions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  // Get status badge style
  const getStatusBadge = (status: Session['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-primary/10 text-primary';
      case 'completed':
        return 'bg-success/10 text-success';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <DashboardLayout userRole="mentee">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Schedule</h1>
            <p className="text-muted-foreground">Manage your mentoring sessions</p>
          </div>
          <button className="btn-primary shrink-0 self-start">
            Schedule New Session
          </button>
        </div>

        {/* Calendar controls */}
        <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigateDate('prev')} 
                className="p-1 rounded-md hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <button 
                onClick={() => navigateDate('next')} 
                className="p-1 rounded-md hover:bg-secondary transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center bg-secondary rounded-lg p-1">
              <button 
                onClick={() => setView('week')} 
                className={`px-3 py-1 rounded-md text-sm ${
                  view === 'week' ? 'bg-background shadow-sm' : 'hover:bg-secondary/80'
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setView('month')} 
                className={`px-3 py-1 rounded-md text-sm ${
                  view === 'month' ? 'bg-background shadow-sm' : 'hover:bg-secondary/80'
                }`}
              >
                Month
              </button>
              <button 
                onClick={() => setView('list')} 
                className={`px-3 py-1 rounded-md text-sm ${
                  view === 'list' ? 'bg-background shadow-sm' : 'hover:bg-secondary/80'
                }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Simple placeholder for calendar view - in a real app, use a proper calendar component */}
          {view !== 'list' && (
            <div className="p-4 text-center border-b">
              <p className="text-muted-foreground">
                {view === 'week' ? 'Weekly' : 'Monthly'} calendar view would be displayed here.
              </p>
              <p className="text-sm mt-1">
                For a production app, use a library like react-big-calendar or @fullcalendar/react
              </p>
            </div>
          )}

          {/* Session list */}
          <div className="p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              {view === 'list' ? 'All' : 'Upcoming'} Sessions
            </h3>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session</TableHead>
                  <TableHead className="hidden md:table-cell">Mentor</TableHead>
                  <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredSessions().map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          session.type === 'video' ? 'bg-primary/10 text-primary' :
                          session.type === 'in-person' ? 'bg-success/10 text-success' :
                          'bg-secondary text-secondary-foreground'
                        }`}>
                          {getSessionTypeIcon(session.type)}
                        </div>
                        <div>
                          <div className="font-medium">{session.topic}</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{session.duration} min</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <span className="font-medium text-xs">
                            {session.mentor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span>{session.mentor.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col text-sm">
                        <span>{formatDate(session.date)}</span>
                        <span className="text-muted-foreground">
                          {session.startTime} - {session.endTime}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`badge ${getStatusBadge(session.status)}`}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {session.status === 'upcoming' && (
                          <>
                            <button className="btn-primary text-xs py-1 px-2 h-auto">
                              Join
                            </button>
                            <button className="btn-outline text-xs py-1 px-2 h-auto">
                              Reschedule
                            </button>
                          </>
                        )}
                        {session.status === 'completed' && (
                          <button className="btn-outline text-xs py-1 px-2 h-auto">
                            View Notes
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: 'My Mentors',
              description: 'View and manage your mentor relationships',
              icon: <Users className="h-5 w-5 text-primary" />,
              link: '/dashboard/mentors'
            },
            {
              title: 'Past Sessions',
              description: 'Review notes and recordings from past sessions',
              icon: <Clock className="h-5 w-5 text-primary" />,
              link: '/dashboard/history'
            },
            {
              title: 'Find New Mentors',
              description: 'Browse our mentor directory to find new mentors',
              icon: <Users className="h-5 w-5 text-primary" />,
              link: '/mentors'
            }
          ].map((action, index) => (
            <div 
              key={index} 
              className="bg-card border rounded-lg p-4 hover:border-primary/20 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-medium">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
