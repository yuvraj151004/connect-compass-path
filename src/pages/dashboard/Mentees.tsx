
import React from 'react';
import { MoreHorizontal, UserPlus, Calendar, MessageSquare, Star, File, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const menteeData = [
  {
    id: 1,
    name: 'Emma Johnson',
    avatar: '/placeholder.svg',
    title: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'UI/UX'],
    bio: 'Junior developer looking to improve frontend skills and architecture knowledge',
    lastSession: '2 days ago'
  },
  {
    id: 2,
    name: 'David Martinez',
    avatar: '/placeholder.svg',
    title: 'Data Science Student',
    skills: ['Python', 'Data Analysis', 'Machine Learning'],
    bio: 'Studying data science, looking for guidance on career paths and project work',
    lastSession: '1 week ago'
  },
  {
    id: 3,
    name: 'Sarah Wilson',
    avatar: '/placeholder.svg',
    title: 'Mobile Developer',
    skills: ['React Native', 'Flutter', 'iOS'],
    bio: 'Mobile app developer looking to discuss architecture and performance optimization',
    lastSession: 'Just started'
  },
  {
    id: 4,
    name: 'Michael Chen',
    avatar: '/placeholder.svg',
    title: 'Backend Engineer',
    skills: ['Node.js', 'Java', 'Databases'],
    bio: 'Backend developer looking for guidance on system design and scaling',
    lastSession: '3 days ago'
  },
];

const Mentees = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Mentees</h1>
          <p className="text-muted-foreground">
            Manage and engage with your mentees effectively.
          </p>
        </div>
        <Button className="bg-mentor text-white" onClick={() => navigate('/dashboard/new-session')}>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Input
            placeholder="Search mentees..."
            className="pl-10 w-full"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2 flex-grow sm:flex-grow-0">
            <Filter className="h-4 w-4" /> 
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" className="gap-2 flex-grow sm:flex-grow-0">
            <Star className="h-4 w-4" /> 
            <span className="hidden sm:inline">Favorites</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {menteeData.map((mentee) => (
          <Card key={mentee.id} className="overflow-hidden">
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mentee.avatar} alt={mentee.name} />
                    <AvatarFallback>{mentee.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{mentee.name}</CardTitle>
                    <CardDescription>{mentee.title}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/dashboard/new-session')}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Session
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard/messages')}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <File className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground line-clamp-2">{mentee.bio}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {mentee.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <span className="text-xs text-muted-foreground">Last session: {mentee.lastSession}</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Mentees;
