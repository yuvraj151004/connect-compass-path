
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Users, Video, VideoOff, Mic, MicOff, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

interface MentorData {
  id: string;
  name: string;
}

interface MenteeData {
  id: string;
  name: string;
}

const ScheduleMeeting = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [duration, setDuration] = useState<string>('30');
  const [meetingType, setMeetingType] = useState<'video' | 'chat'>('video');
  const [topic, setTopic] = useState<string>('');
  const [agenda, setAgenda] = useState<string>('');
  const [userRole, setUserRole] = useState<'mentor' | 'mentee'>(() => {
    // Get the role from location state or localStorage
    const state = window.history.state?.usr?.userRole;
    return state || localStorage.getItem('userRole') || 'mentee';
  });

  // Mock data - in a real app, this would come from an API
  const mentors: MentorData[] = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Michael Chen' },
    { id: '3', name: 'Alex Rivera' },
  ];

  const mentees: MenteeData[] = [
    { id: '1', name: 'James Wilson' },
    { id: '2', name: 'Emily Parker' },
    { id: '3', name: 'Daniel Kim' },
  ];

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot) {
      toast({
        title: "Missing information",
        description: "Please select both a date and time for the meeting.",
        variant: "destructive",
      });
      return;
    }

    // Format the meeting details for display
    const meetingDetails = {
      date: date ? format(date, 'EEEE, MMMM do, yyyy') : '',
      time: timeSlot,
      duration: `${duration} minutes`,
      type: meetingType,
      topic,
      agenda,
      with: userRole === 'mentor' ? 'Mentee' : 'Mentor',
    };

    // In a real app, this would be sent to an API
    console.log('Meeting scheduled:', meetingDetails);
    
    // Show success message
    toast({
      title: "Meeting scheduled successfully!",
      description: `Your ${meetingDetails.duration} ${meetingDetails.type} meeting is set for ${meetingDetails.date} at ${meetingDetails.time}.`,
    });

    // Show additional instructions for video meetings
    if (meetingType === 'video') {
      toast({
        title: "Video meeting info",
        description: "A meeting link will be sent to your email. Click it at the scheduled time to join.",
      });
    }
  };

  // New: Render a preview of video call UI when video is selected
  const renderVideoCallPreview = () => {
    if (meetingType !== 'video') return null;

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Video Call Preview</CardTitle>
          <CardDescription>This is how your video call will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full aspect-video bg-gray-100 rounded-md overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Video className="h-16 w-16 text-gray-300" />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-background/90 rounded-full px-4 py-2 shadow-md">
              <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                <Mic className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                <VideoOff className="h-5 w-5" />
              </button>
              <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                <span className="sr-only">End call</span>
                <span className="block h-5 w-5">×</span>
              </button>
            </div>
            <div className="absolute bottom-4 right-4 w-32 aspect-video bg-gray-200 rounded-md border-2 border-white shadow-md overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Schedule a Meeting</h1>
          <p className="text-muted-foreground">Book time with your {userRole === 'mentor' ? 'mentees' : 'mentors'}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Calendar Column */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose when you want to meet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label className="mb-2 block">Available Time Slots</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTimeSlot(slot)}
                            className={`p-2 border rounded-md text-sm text-center transition-colors ${
                              timeSlot === slot
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background hover:bg-secondary/50'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <select
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full border rounded-md p-2 bg-background"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Meeting Type</Label>
                  <RadioGroup 
                    defaultValue="video" 
                    value={meetingType}
                    onValueChange={(value) => setMeetingType(value as 'video' | 'chat')}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video" className="flex items-center gap-1.5 cursor-pointer">
                        <Video className="h-4 w-4" />
                        <span>Video Call</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="chat" id="chat" />
                      <Label htmlFor="chat" className="flex items-center gap-1.5 cursor-pointer">
                        <MessageSquare className="h-4 w-4" />
                        <span>Chat</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {renderVideoCallPreview()}

            <Card>
              <CardHeader>
                <CardTitle>Meeting Details</CardTitle>
                <CardDescription>Provide information about the meeting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Meeting Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Career Guidance, Technical Discussion"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agenda">Meeting Agenda</Label>
                  <Textarea
                    id="agenda"
                    placeholder="What would you like to discuss?"
                    rows={4}
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                  />
                </div>

                {userRole === 'mentor' && (
                  <div className="space-y-2">
                    <Label htmlFor="mentee">Select Mentee</Label>
                    <select
                      id="mentee"
                      className="w-full border rounded-md p-2 bg-background"
                    >
                      <option value="">Select a mentee</option>
                      {mentees.map((mentee) => (
                        <option key={mentee.id} value={mentee.id}>
                          {mentee.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {userRole === 'mentee' && (
                  <div className="space-y-2">
                    <Label htmlFor="mentor">Select Mentor</Label>
                    <select
                      id="mentor"
                      className="w-full border rounded-md p-2 bg-background"
                    >
                      <option value="">Select a mentor</option>
                      {mentors.map((mentor) => (
                        <option key={mentor.id} value={mentor.id}>
                          {mentor.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn-primary w-full"
                >
                  Schedule Meeting
                </button>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="p-3 border rounded-md space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{i === 1 ? 'Sarah Johnson' : 'Michael Chen'}</span>
                      <span className="badge bg-primary/10 text-primary text-xs">Upcoming</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>{format(new Date(Date.now() + i * 24 * 60 * 60 * 1000), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{i === 1 ? '10:00 AM' : '02:30 PM'} • 30 minutes</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Video className="h-3.5 w-3.5" />
                      <span>Video Call</span>
                    </div>
                  </div>
                ))}
                <Link 
                  to="/dashboard/schedule" 
                  className="text-sm text-primary hover:underline flex items-center justify-center w-full"
                >
                  View all meetings
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Meeting Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium">Test your equipment</p>
                  <p className="text-muted-foreground">Ensure your camera and microphone are working before the meeting.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Find a quiet space</p>
                  <p className="text-muted-foreground">Choose a location with minimal background noise and distractions.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Check your connection</p>
                  <p className="text-muted-foreground">Make sure you have a stable internet connection for smooth video.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Be on time</p>
                  <p className="text-muted-foreground">Join a few minutes early to check your setup.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ScheduleMeeting;
