
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight,
  User,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Schedule = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'mentee' | 'mentor'>(
    (localStorage.getItem('userRole') as 'mentee' | 'mentor') || 'mentee'
  );
  
  // Sample upcoming sessions data
  const upcomingSessions = [
    {
      id: 1,
      title: 'Career Development Discussion',
      date: 'Today',
      time: '3:00 PM - 4:00 PM',
      participant: userRole === 'mentor' ? 'Emma Johnson' : 'Dr. Anna Rodriguez',
      avatar: '/placeholder.svg',
      type: 'video',
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Code Review Session',
      date: 'Tomorrow',
      time: '10:30 AM - 11:30 AM',
      participant: userRole === 'mentor' ? 'David Martinez' : 'James Wilson, Sr. Dev',
      avatar: '/placeholder.svg',
      type: 'video',
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Project Planning',
      date: 'Apr 15, 2025',
      time: '2:00 PM - 3:00 PM',
      participant: userRole === 'mentor' ? 'Sarah Wilson' : 'Maria Garcia, PM',
      avatar: '/placeholder.svg',
      type: 'in-person',
      status: 'upcoming',
    },
  ];
  
  // Sample past sessions data
  const pastSessions = [
    {
      id: 4,
      title: 'Interview Preparation',
      date: 'Apr 5, 2025',
      time: '11:00 AM - 12:00 PM',
      participant: userRole === 'mentor' ? 'Michael Chen' : 'Dr. Anna Rodriguez',
      avatar: '/placeholder.svg',
      type: 'video',
      status: 'completed',
    },
    {
      id: 5,
      title: 'Technical Skills Review',
      date: 'Mar 28, 2025',
      time: '3:30 PM - 4:30 PM',
      participant: userRole === 'mentor' ? 'Emma Johnson' : 'James Wilson, Sr. Dev',
      avatar: '/placeholder.svg',
      type: 'video',
      status: 'completed',
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground">
            {userRole === 'mentor' 
              ? 'Manage your upcoming mentoring sessions and view past sessions' 
              : 'Schedule and manage your sessions with mentors'}
          </p>
        </div>
        <Button 
          onClick={() => navigate('/dashboard/new-session')}
          className={userRole === 'mentor' ? 'bg-mentor text-white' : 'bg-mentee text-white'}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">April 2025</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => (
              <Card key={session.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={session.date === 'Today' ? 'destructive' : 'outline'}>
                          {session.date}
                        </Badge>
                        {session.type === 'video' && (
                          <Badge variant="secondary">
                            <Video className="mr-1 h-3 w-3" />
                            Video
                          </Badge>
                        )}
                        {session.type === 'in-person' && (
                          <Badge variant="secondary">In-Person</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mt-2">{session.title}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate('/virtual-meeting-room')}>
                          Join Meeting
                        </DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Cancel Session</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{session.time}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    {userRole === 'mentor' ? (
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={session.avatar} alt={session.participant} />
                        <AvatarFallback>{session.participant.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{session.participant}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                  {session.date === 'Today' && (
                    <Button size="sm" onClick={() => navigate('/virtual-meeting-room')}>
                      <Video className="mr-2 h-4 w-4" />
                      Join Session
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No upcoming sessions scheduled.</p>
                <Button 
                  className="mt-4"
                  onClick={() => navigate('/dashboard/new-session')}
                >
                  Schedule New Session
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {pastSessions.map((session) => (
            <Card key={session.id}>
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{session.date}</Badge>
                      {session.type === 'video' && (
                        <Badge variant="secondary">
                          <Video className="mr-1 h-3 w-3" />
                          Video
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-2">{session.title}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Notes</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Follow-up</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{session.time}</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  {userRole === 'mentor' ? (
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <User className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={session.avatar} alt={session.participant} />
                      <AvatarFallback>{session.participant.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{session.participant}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  View Session
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Schedule;
