import React from 'react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Search, 
  Filter, 
  ChevronRight,
  MoreVertical 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DashboardLayout from '@/components/DashboardLayout';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  nextSession: string | null;
  status: 'active' | 'pending' | 'completed';
}

const MyMentors = () => {
  const navigate = useNavigate();
  
  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Vikram Mehta',
      title: 'Senior Software Engineer',
      company: 'TechGiant Inc.',
      expertise: ['React', 'Node.js', 'System Design'],
      nextSession: '2025-04-15T14:00:00',
      status: 'active',
    },
    {
      id: '2',
      name: 'Neha Gupta',
      title: 'Product Manager',
      company: 'InnovateCorp',
      expertise: ['Product Strategy', 'Agile', 'User Research'],
      nextSession: '2025-04-18T10:30:00',
      status: 'active',
    },
    {
      id: '3',
      name: 'Rohit Sharma',
      title: 'UX/UI Designer',
      company: 'DesignHub',
      expertise: ['UI Design', 'User Testing', 'Figma'],
      nextSession: null,
      status: 'pending',
    },
    {
      id: '4',
      name: 'Anjali Desai',
      title: 'Frontend Tech Lead',
      company: 'WebWorks',
      expertise: ['React', 'TypeScript', 'Performance Optimization'],
      nextSession: null,
      status: 'completed',
    },
  ];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not scheduled';
    
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const getStatusBadge = (status: Mentor['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'completed':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const handleViewProfile = (mentorId: string) => {
    navigate(`/mentors/${mentorId}`);
  };

  const handleScheduleSession = (mentorId: string, mentorName: string) => {
    navigate('/dashboard/new-session', {
      state: { mentorId, mentorName, userRole: 'mentee' }
    });
  };

  const handleSendMessage = (mentorId: string) => {
    navigate('/dashboard/messages', {
      state: { messageId: mentorId, userRole: 'mentee' }
    });
  };

  return (
    <DashboardLayout userRole="mentee">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Mentors</h1>
            <p className="text-muted-foreground">Manage your mentorship relationships</p>
          </div>
          <Link to="/mentors" className="btn-primary shrink-0 self-start">
            Find New Mentors
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search mentors..." 
              className="pl-9"
            />
          </div>
          <button className="btn-outline flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mentor</TableHead>
                <TableHead className="hidden md:table-cell">Expertise</TableHead>
                <TableHead className="hidden md:table-cell">Next Session</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mentors.map((mentor) => (
                <TableRow key={mentor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <span className="font-medium text-sm">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{mentor.name}</div>
                        <div className="text-sm text-muted-foreground">{mentor.title} at {mentor.company}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 2).map((skill, i) => (
                        <span key={i} className="badge bg-secondary text-secondary-foreground text-xs">
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 2 && (
                        <span className="badge bg-secondary text-secondary-foreground text-xs">
                          +{mentor.expertise.length - 2}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {mentor.nextSession ? (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{formatDate(mentor.nextSession)}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not scheduled</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`badge ${getStatusBadge(mentor.status)}`}>
                      {mentor.status.charAt(0).toUpperCase() + mentor.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none">
                          <div className="p-2 rounded-md hover:bg-secondary">
                            <MoreVertical className="h-4 w-4" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover border shadow-md z-50">
                          <DropdownMenuItem onClick={() => handleViewProfile(mentor.id)} className="cursor-pointer">
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleScheduleSession(mentor.id, mentor.name)} className="cursor-pointer">
                            Schedule Session
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendMessage(mentor.id)} className="cursor-pointer">
                            Send Message
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Schedule a Session',
              description: 'Book a new mentoring session with any of your mentors',
              icon: <Calendar className="h-5 w-5 text-primary" />,
              link: '/dashboard/schedule'
            },
            {
              title: 'Message Center',
              description: 'View and send messages to your mentors',
              icon: <MessageSquare className="h-5 w-5 text-primary" />,
              link: '/dashboard/messages'
            },
            {
              title: 'Find New Mentors',
              description: 'Browse our mentor directory to find new mentors',
              icon: <Users className="h-5 w-5 text-primary" />,
              link: '/mentors'
            }
          ].map((action, index) => (
            <Link 
              key={index} 
              to={action.link} 
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
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyMentors;
