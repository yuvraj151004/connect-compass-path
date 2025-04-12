
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, FileText, Video, Globe, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const NewSession = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<'mentee' | 'mentor'>(
    (localStorage.getItem('userRole') as 'mentee' | 'mentor') || 'mentee'
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Session scheduled",
      description: "Your mentoring session has been scheduled successfully.",
    });
    
    navigate('/dashboard/schedule');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Schedule New Session</h1>
        <p className="text-muted-foreground">
          {userRole === 'mentor' 
            ? "Create a new mentoring session with one of your mentees" 
            : "Schedule a new mentoring session with your mentor"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
            <CardDescription>Provide the information for your mentoring session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Participant Selection */}
            <div className="space-y-2">
              <Label htmlFor="participant">
                {userRole === 'mentor' ? 'Select Mentee' : 'Select Mentor'}
              </Label>
              <Select defaultValue="participant1">
                <SelectTrigger id="participant">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {userRole === 'mentor' ? (
                    <>
                      <SelectItem value="participant1">Emma Johnson</SelectItem>
                      <SelectItem value="participant2">David Martinez</SelectItem>
                      <SelectItem value="participant3">Sarah Wilson</SelectItem>
                      <SelectItem value="participant4">Michael Chen</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="participant1">Dr. Anna Rodriguez</SelectItem>
                      <SelectItem value="participant2">James Wilson, Sr. Dev</SelectItem>
                      <SelectItem value="participant3">Maria Garcia, PM</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Date Selection */}
              <div className="space-y-2">
                <Label htmlFor="date">Session Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="date" type="date" className="pl-10" />
                </div>
              </div>
              
              {/* Time Selection */}
              <div className="space-y-2">
                <Label htmlFor="time">Session Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="time" type="time" className="pl-10" />
                </div>
              </div>
            </div>
            
            {/* Duration Selection */}
            <div className="space-y-2">
              <Label htmlFor="duration">Session Duration</Label>
              <Select defaultValue="30">
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Session Type */}
            <div className="space-y-2">
              <Label>Session Type</Label>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-md border p-4 cursor-pointer hover:border-primary">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Video className="h-5 w-5 text-primary" />
                      <div className="font-medium">Video Call</div>
                    </div>
                    <input type="radio" name="session-type" defaultChecked />
                  </div>
                </div>
                <div className="rounded-md border p-4 cursor-pointer hover:border-primary">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <div className="font-medium">Chat</div>
                    </div>
                    <input type="radio" name="session-type" />
                  </div>
                </div>
                <div className="rounded-md border p-4 cursor-pointer hover:border-primary">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-primary" />
                      <div className="font-medium">In Person</div>
                    </div>
                    <input type="radio" name="session-type" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Session Topic */}
            <div className="space-y-2">
              <Label htmlFor="topic">Session Topic</Label>
              <Input id="topic" placeholder="e.g. Career Guidance, Technical Review, etc." />
            </div>
            
            {/* Session Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description & Goals</Label>
              <Textarea 
                id="description" 
                placeholder="Describe what you'd like to achieve in this session..."
                rows={5}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" className={userRole === 'mentor' ? 'bg-mentor text-white' : 'bg-mentee text-white'}>
              Schedule Session
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default NewSession;
