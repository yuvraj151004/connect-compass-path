
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Check } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

const NewSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [duration, setDuration] = useState<string>('30');
  const [sessionType, setSessionType] = useState<'video' | 'chat'>('video');
  const [topic, setTopic] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  
  // Get mentor ID and name from location state if available
  const mentorId = location.state?.mentorId;
  const mentorName = location.state?.mentorName;
  const userRole = location.state?.userRole || localStorage.getItem('userRole') || 'mentee';
  
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
        description: "Please select both a date and time for the session.",
        variant: "destructive",
      });
      return;
    }

    // Format the session details for display
    const sessionDetails = {
      date: date ? format(date, 'EEEE, MMMM do, yyyy') : '',
      time: timeSlot,
      duration: `${duration} minutes`,
      type: sessionType,
      topic,
      description,
      with: mentorName || (userRole === 'mentor' ? 'Mentee' : 'Mentor'),
    };

    // In a real app, this would be sent to an API
    console.log('Session scheduled:', sessionDetails);
    
    // Show success message
    toast({
      title: "Session scheduled successfully!",
      description: `Your ${sessionDetails.duration} ${sessionDetails.type} session with ${sessionDetails.with} is set for ${sessionDetails.date} at ${sessionDetails.time}.`,
    });

    // Navigate back to dashboard
    setTimeout(() => {
      navigate('/dashboard/schedule', { state: { userRole } });
    }, 1500);
  };

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Schedule New Session</h1>
          <p className="text-muted-foreground">
            {mentorName 
              ? `Schedule a session with ${mentorName}` 
              : `Book time with your ${userRole === 'mentor' ? 'mentees' : 'mentors'}`}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Calendar Column */}
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose when you want to meet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border mx-auto"
                  disabled={(date) => date < new Date()}
                />
                
                <div className="space-y-4">
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
              </CardContent>
            </Card>

            {/* Session Details */}
            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
                <CardDescription>Provide information about this session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Session Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Career Guidance, Technical Discussion"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Session Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What would you like to discuss in this session?"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Session Type</Label>
                  <RadioGroup 
                    defaultValue="video" 
                    value={sessionType}
                    onValueChange={(value) => setSessionType(value as 'video' | 'chat')}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video" className="cursor-pointer">Video Call</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="chat" id="chat" />
                      <Label htmlFor="chat" className="cursor-pointer">Text Chat</Label>
                    </div>
                  </RadioGroup>
                </div>

                {mentorName && (
                  <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-md">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <span className="font-medium text-sm">
                        {mentorName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{mentorName}</p>
                      <p className="text-xs text-muted-foreground">Selected Mentor</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition-colors"
                >
                  Schedule Session
                </button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NewSession;
