
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus, Search, Briefcase, Star, Filter, Bookmark, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  rating: number;
  skills: string[];
  experience: number;
  price: number;
  availability: string;
  imageUrl: string;
  bio: string;
}

const FindMentors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  
  // Mock data for mentors
  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer',
      company: 'Google',
      rating: 4.9,
      skills: ['React', 'Node.js', 'TypeScript', 'System Design'],
      experience: 8,
      price: 75,
      availability: 'Weekdays',
      imageUrl: '/placeholder.svg',
      bio: 'Experienced software engineer with a focus on frontend development and architecture.'
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Product Manager',
      company: 'Amazon',
      rating: 4.7,
      skills: ['Product Strategy', 'User Research', 'Agile', 'Growth'],
      experience: 6,
      price: 85,
      availability: 'Evenings & Weekends',
      imageUrl: '/placeholder.svg',
      bio: 'Product manager with experience in consumer products and e-commerce platforms.'
    },
    {
      id: '3',
      name: 'Alex Rivera',
      title: 'UX Designer',
      company: 'Adobe',
      rating: 4.8,
      skills: ['UI/UX', 'Figma', 'User Testing', 'Design Systems'],
      experience: 5,
      price: 65,
      availability: 'Flexible',
      imageUrl: '/placeholder.svg',
      bio: 'Design professional specializing in creating intuitive and accessible user experiences.'
    },
    {
      id: '4',
      name: 'Lisa Wong',
      title: 'Data Scientist',
      company: 'Netflix',
      rating: 4.9,
      skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
      experience: 7,
      price: 90,
      availability: 'Weekends',
      imageUrl: '/placeholder.svg',
      bio: 'Data scientist with expertise in predictive modeling and recommendation systems.'
    },
    {
      id: '5',
      name: 'James Wilson',
      title: 'Blockchain Developer',
      company: 'Ethereum Foundation',
      rating: 4.6,
      skills: ['Solidity', 'Smart Contracts', 'Web3', 'DeFi'],
      experience: 4,
      price: 95,
      availability: 'Afternoons',
      imageUrl: '/placeholder.svg',
      bio: 'Blockchain developer specializing in DeFi applications and smart contract security.'
    },
    {
      id: '6',
      name: 'Emily Parker',
      title: 'Engineering Manager',
      company: 'Microsoft',
      rating: 4.9,
      skills: ['Leadership', 'Team Building', 'Career Development', 'Technical Architecture'],
      experience: 10,
      price: 100,
      availability: 'Weekdays',
      imageUrl: '/placeholder.svg',
      bio: 'Engineering leader focused on building high-performing teams and mentoring junior engineers.'
    }
  ];
  
  // Filter mentors based on search term
  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle bookmark toggle
  const toggleBookmark = (mentorId: string) => {
    setBookmarked(prev => ({
      ...prev,
      [mentorId]: !prev[mentorId]
    }));
    
    toast({
      title: bookmarked[mentorId] ? "Mentor removed from bookmarks" : "Mentor added to bookmarks",
      description: bookmarked[mentorId] 
        ? "You can add them back anytime." 
        : "You can find them in your bookmarked mentors list.",
    });
  };
  
  // Handle booking a session
  const bookSession = (mentor: Mentor) => {
    navigate('/dashboard/new-session', { 
      state: { 
        mentorId: mentor.id,
        mentorName: mentor.name,
        userRole: 'mentee'
      } 
    });
  };
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Mentor</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with industry experts who can guide you through your career journey and help you achieve your goals.
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="mb-10 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, skill, or company..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Card className="p-4 flex items-center gap-3">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] border-none shadow-none p-0 h-auto">
                  <SelectValue placeholder="Expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Expertise</SelectItem>
                  <SelectItem value="software">Software Development</SelectItem>
                  <SelectItem value="product">Product Management</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                </SelectContent>
              </Select>
            </Card>
            
            <Card className="p-4 flex items-center gap-3">
              <Star className="h-5 w-5 text-muted-foreground" />
              <Select defaultValue="4">
                <SelectTrigger className="w-[180px] border-none shadow-none p-0 h-auto">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Rating</SelectItem>
                  <SelectItem value="4.5">4.5+</SelectItem>
                  <SelectItem value="4">4.0+</SelectItem>
                  <SelectItem value="3.5">3.5+</SelectItem>
                </SelectContent>
              </Select>
            </Card>
            
            <Card className="p-4 flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <Select defaultValue="any">
                <SelectTrigger className="w-[180px] border-none shadow-none p-0 h-auto">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Experience</SelectItem>
                  <SelectItem value="10">10+ years</SelectItem>
                  <SelectItem value="5">5+ years</SelectItem>
                  <SelectItem value="3">3+ years</SelectItem>
                </SelectContent>
              </Select>
            </Card>
          </div>
        </div>
        
        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map(mentor => (
            <Card key={mentor.id} className="overflow-hidden">
              <div className="relative pt-4 px-4">
                <button 
                  onClick={() => toggleBookmark(mentor.id)}
                  className="absolute top-6 right-6 z-10"
                >
                  <Bookmark 
                    className={`h-6 w-6 ${bookmarked[mentor.id] ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                  />
                </button>
                
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-secondary mb-4 overflow-hidden">
                    <img 
                      src={mentor.imageUrl} 
                      alt={mentor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{mentor.name}</h3>
                  <p className="text-muted-foreground">{mentor.title}</p>
                  <p className="text-sm text-muted-foreground">at {mentor.company}</p>
                  
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
                  </div>
                </div>
              </div>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Skills & Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="bg-secondary text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Experience</p>
                      <p className="font-medium">{mentor.experience} years</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Rate</p>
                      <p className="font-medium">${mentor.price}/hour</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground text-sm">Availability</p>
                    <p className="font-medium text-sm">{mentor.availability}</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-3">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate(`/mentors/${mentor.id}`)}
                >
                  View Profile
                </Button>
                <Button 
                  className="w-full flex items-center gap-1"
                  onClick={() => bookSession(mentor)}
                >
                  <CalendarPlus className="h-4 w-4" />
                  Book Session
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No mentors found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FindMentors;
