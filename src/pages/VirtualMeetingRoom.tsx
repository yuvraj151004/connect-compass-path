
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const VirtualMeetingRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  
  const meetingId = location.state?.meetingId || 'unknown';
  const userRole = location.state?.userRole || 'mentee';
  
  // Mock participants
  const participants = [
    { id: '1', name: 'John Smith', role: 'mentee' },
    { id: '2', name: userRole === 'mentor' ? 'James Wilson' : 'Sarah Johnson', role: userRole === 'mentor' ? 'mentee' : 'mentor' }
  ];
  
  // Mock chat messages
  const [messages, setMessages] = useState([
    { id: '1', sender: userRole === 'mentor' ? 'James Wilson' : 'Sarah Johnson', text: 'Hello, how are you today?', time: '2:01 PM' }
  ]);
  
  // New message input
  const [newMessage, setNewMessage] = useState('');
  
  // Meeting duration timer
  const [duration, setDuration] = useState(0);
  
  useEffect(() => {
    // Start timer for meeting duration
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
    
    // Clean up timer on unmount
    return () => clearInterval(timer);
  }, []);
  
  // Format duration as mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle sending a new chat message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: Date.now().toString(),
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };
  
  // Handle ending the meeting
  const handleEndCall = () => {
    toast({
      title: "Meeting ended",
      description: `Meeting duration: ${formatDuration(duration)}`,
    });
    
    navigate('/dashboard', { state: { userRole } });
  };
  
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Meeting header */}
      <header className="bg-card border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Video className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold">Video Session</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Meeting ID: {meetingId}</span>
              <span>•</span>
              <span>{formatDuration(duration)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setParticipantsOpen(!participantsOpen)}
            className={participantsOpen ? 'bg-primary/10' : ''}
          >
            <Users className="h-4 w-4 mr-1" />
            Participants ({participants.length})
          </Button>
        </div>
      </header>
      
      {/* Main content area with video */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main video area */}
        <div className="flex-1 relative bg-black p-4">
          {/* Main video stream */}
          <div className="h-full flex items-center justify-center">
            {videoOn ? (
              <div className="aspect-video max-h-full w-full max-w-4xl bg-gray-700 rounded-lg flex items-center justify-center">
                <Video className="h-16 w-16 text-gray-500" />
              </div>
            ) : (
              <div className="aspect-video max-h-full w-full max-w-4xl bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-4xl text-white">
                    {userRole === 'mentor' ? 'JW' : 'SJ'}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Self view (picture-in-picture) */}
          <div className="absolute bottom-8 right-8 w-48 aspect-video bg-gray-800 rounded-lg border-2 border-background shadow-lg overflow-hidden">
            <div className="h-full flex items-center justify-center">
              {videoOn ? (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-sm text-white">Your camera</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-xl text-white">JS</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Side panel (chat or participants) */}
        {(chatOpen || participantsOpen) && (
          <div className="w-80 border-l bg-card overflow-hidden flex flex-col">
            <div className="border-b p-3">
              <h2 className="font-medium">{chatOpen ? 'Chat' : 'Participants'}</h2>
            </div>
            
            {/* Chat messages */}
            {chatOpen && (
              <>
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map(message => (
                    <div key={message.id} className={`flex flex-col ${message.sender === 'You' ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <div className={`max-w-[85%] p-3 rounded-lg ${
                        message.sender === 'You' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary'
                      }`}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Chat input */}
                <form onSubmit={handleSendMessage} className="p-3 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 p-2 rounded-md border bg-background text-sm"
                    />
                    <Button type="submit" size="sm">Send</Button>
                  </div>
                </form>
              </>
            )}
            
            {/* Participants list */}
            {participantsOpen && (
              <div className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-3">
                  {participants.map(participant => (
                    <li key={participant.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <span className="font-medium text-sm">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{participant.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs">Active</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Meeting controls */}
      <footer className="bg-card border-t p-4 flex items-center justify-between">
        <div>
          <Button variant="outline" size="sm" onClick={() => toast({ title: "Settings", description: "Meeting settings dialog would open here" })}>
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant={micOn ? "outline" : "secondary"}
            size="icon"
            onClick={() => setMicOn(!micOn)}
            className="h-12 w-12 rounded-full"
          >
            {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>
          
          <Button
            variant={videoOn ? "outline" : "secondary"}
            size="icon"
            onClick={() => setVideoOn(!videoOn)}
            className="h-12 w-12 rounded-full"
          >
            {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="destructive"
            size="icon"
            onClick={handleEndCall}
            className="h-12 w-12 rounded-full"
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
        
        <div>
          <Button
            variant={chatOpen ? "default" : "outline"} 
            size="sm"
            onClick={() => {
              setChatOpen(!chatOpen);
              if (participantsOpen && !chatOpen) setParticipantsOpen(false);
            }}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Chat
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default VirtualMeetingRoom;
