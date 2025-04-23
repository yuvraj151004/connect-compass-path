import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, Send, User, Briefcase, CheckCheck, Clock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import DashboardLayout from '@/components/DashboardLayout';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
  role: 'mentor' | 'mentee';
}

interface Conversation {
  id: string;
  participant: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  role: 'mentor' | 'mentee';
}

const Messages = () => {
  const location = useLocation();
  const userRole = location.state?.userRole || 'mentee';
  const messageId = location.state?.messageId;
  
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participant: userRole === 'mentor' ? 'Arjun Patel' : 'Neha Gupta',
      lastMessage: userRole === 'mentor' 
        ? 'Thank you for the feedback on my resume!' 
        : 'Looking forward to our session next week!',
      timestamp: '2 hours ago',
      unread: 1,
      role: userRole === 'mentor' ? 'mentee' : 'mentor'
    },
    {
      id: '2',
      participant: userRole === 'mentor' ? 'Priya Sharma' : 'Rajesh Kumar',
      lastMessage: userRole === 'mentor'
        ? 'When can we schedule our next session?'
        : "I've shared some resources ahead of our meeting.",
      timestamp: '1 day ago',
      unread: 0,
      role: userRole === 'mentor' ? 'mentee' : 'mentor'
    },
    {
      id: '3',
      participant: userRole === 'mentor' ? 'Amit Verma' : 'Deepa Reddy',
      lastMessage: userRole === 'mentor'
        ? 'I applied for that job we discussed'
        : 'Do you have time to review my code?',
      timestamp: '2 days ago',
      unread: 0,
      role: userRole === 'mentor' ? 'mentee' : 'mentor'
    }
  ]);
  
  const [selectedConversation, setSelectedConversation] = useState<string>(
    messageId || conversations[0].id
  );
  
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '1-1',
        sender: userRole === 'mentor' ? 'Arjun Patel' : 'Neha Gupta',
        content: userRole === 'mentor' 
          ? "Hi, I wanted to thank you for reviewing my resume last week."
          : "Hello! I'm looking forward to our session next week.",
        timestamp: '2 hours ago',
        read: true,
        role: userRole === 'mentor' ? 'mentee' : 'mentor'
      },
      {
        id: '1-2',
        sender: 'You',
        content: userRole === 'mentor' 
          ? "You're welcome! Have you sent any applications yet?"
          : "Me too! I have a few specific topics I'd like to discuss.",
        timestamp: '1 hour ago',
        read: true,
        role: userRole
      },
      {
        id: '1-3',
        sender: userRole === 'mentor' ? 'Arjun Patel' : 'Neha Gupta',
        content: userRole === 'mentor' 
          ? "Yes, I applied to three companies you recommended. Fingers crossed!"
          : "Great! I'll make sure to prepare some resources on those topics.",
        timestamp: '30 minutes ago',
        read: false,
        role: userRole === 'mentor' ? 'mentee' : 'mentor'
      }
    ],
    '2': [
      {
        id: '2-1',
        sender: userRole === 'mentor' ? 'Priya Sharma' : 'Rajesh Kumar',
        content: userRole === 'mentor'
          ? "Hi, I was wondering when we could schedule our next session?"
          : "Hi, I've shared some resources for our next meeting.",
        timestamp: '1 day ago',
        read: true,
        role: userRole === 'mentor' ? 'mentee' : 'mentor'
      },
      {
        id: '2-2',
        sender: 'You',
        content: userRole === 'mentor'
          ? "I have some time available next Tuesday afternoon."
          : "Thank you! These look very helpful.",
        timestamp: '1 day ago',
        read: true,
        role: userRole
      }
    ],
    '3': [
      {
        id: '3-1',
        sender: userRole === 'mentor' ? 'Amit Verma' : 'Deepa Reddy',
        content: userRole === 'mentor'
          ? "I applied for that job we discussed last week."
          : "Do you have time to review my code this week?",
        timestamp: '2 days ago',
        read: true,
        role: userRole === 'mentor' ? 'mentee' : 'mentor'
      },
      {
        id: '3-2',
        sender: 'You',
        content: userRole === 'mentor'
          ? "That's great news! Let me know if you hear back."
          : "Yes, I can look at it on Thursday evening.",
        timestamp: '2 days ago',
        read: true,
        role: userRole
      }
    ]
  });
  
  const [newMessage, setNewMessage] = useState<string>('');
  
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    
    setMessages(prev => {
      const conversationMessages = prev[conversationId];
      if (!conversationMessages) return prev;
      
      const updatedMessages = conversationMessages.map(msg => ({
        ...msg,
        read: true
      }));
      
      return {
        ...prev,
        [conversationId]: updatedMessages
      };
    });
    
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId ? { ...conv, unread: 0 } : conv
      )
    );
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const now = new Date();
    const timestamp = 'Just now';
    
    const newMsg: Message = {
      id: `${selectedConversation}-${Date.now()}`,
      sender: 'You',
      content: newMessage,
      timestamp,
      read: true,
      role: userRole
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMsg]
    }));
    
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation 
          ? { ...conv, lastMessage: newMessage, timestamp } 
          : conv
      )
    );
    
    setNewMessage('');
  };
  
  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            Communicate with your {userRole === 'mentor' ? 'mentees' : 'mentors'}
          </p>
        </div>
        
        <div className="border rounded-lg overflow-hidden bg-card h-[calc(100vh-250px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            <div className="border-r h-full flex flex-col">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search conversations" 
                    className="pl-9"
                  />
                </div>
              </div>
              
              <Tabs defaultValue="all" className="px-4 pt-4">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <ScrollArea className="flex-1 px-1">
                <div className="px-3 py-4 space-y-1">
                  {conversations.map(conversation => (
                    <button
                      key={conversation.id}
                      className={`w-full text-left p-3 rounded-md transition-colors ${
                        selectedConversation === conversation.id
                          ? 'bg-secondary'
                          : 'hover:bg-secondary/50'
                      }`}
                      onClick={() => handleSelectConversation(conversation.id)}
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                          <span className="font-medium text-sm">
                            {conversation.participant.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{conversation.participant}</p>
                            <span className="text-xs text-muted-foreground flex-shrink-0">{conversation.timestamp}</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                            {conversation.unread > 0 && (
                              <span className="ml-2 h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center flex-shrink-0">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            <div className="md:col-span-2 flex flex-col h-full">
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                        {conversations.find(c => c.id === selectedConversation)?.role === 'mentor' ? (
                          <Briefcase className="h-5 w-5 text-mentor" />
                        ) : (
                          <User className="h-5 w-5 text-mentee" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {conversations.find(c => c.id === selectedConversation)?.participant}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {conversations.find(c => c.id === selectedConversation)?.role}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages[selectedConversation]?.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[75%] ${
                            message.sender === 'You'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary'
                          } rounded-lg px-4 py-2`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium">{message.sender}</span>
                              <span className="text-xs opacity-70">{message.timestamp}</span>
                            </div>
                            <p>{message.content}</p>
                            {message.sender === 'You' && (
                              <div className="flex justify-end mt-1">
                                <CheckCheck className={`h-3.5 w-3.5 ${message.read ? 'text-blue-500' : 'text-muted-foreground'}`} />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <button 
                        type="submit"
                        className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center flex-col p-6 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No conversation selected</h3>
                  <p className="text-muted-foreground mt-1">
                    Select a conversation from the list to start chatting
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
