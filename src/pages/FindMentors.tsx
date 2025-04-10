
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MentorCard from '../components/MentorCard';
import { Search, Filter, MapPin, Briefcase, Clock, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample data for mentors
const allMentors = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Product Design Lead',
    company: 'Google',
    skills: ['UI/UX Design', 'Product Strategy', 'Career Growth', 'Leadership'],
    rating: 4.9,
    reviewCount: 42,
    featured: true,
    location: 'San Francisco, CA',
    hourlyRate: 75,
    availability: 'Evenings & Weekends'
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Senior Software Engineer',
    company: 'Microsoft',
    skills: ['Full-Stack Development', 'System Architecture', 'React', 'Mentorship'],
    rating: 4.8,
    reviewCount: 35,
    featured: true,
    location: 'Seattle, WA',
    hourlyRate: 85,
    availability: 'Weekday Evenings'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Marketing Director',
    company: 'Adobe',
    skills: ['Digital Marketing', 'Brand Strategy', 'Content Creation', 'Analytics'],
    rating: 4.7,
    reviewCount: 29,
    featured: false,
    location: 'Austin, TX',
    hourlyRate: 70,
    availability: 'Flexible'
  },
  {
    id: '4',
    name: 'David Park',
    title: 'Data Science Manager',
    company: 'Amazon',
    skills: ['Machine Learning', 'Python', 'Data Analysis', 'AI Ethics'],
    rating: 4.9,
    reviewCount: 19,
    featured: false,
    location: 'New York, NY',
    hourlyRate: 90,
    availability: 'Weekends Only'
  },
  {
    id: '5',
    name: 'Priya Sharma',
    title: 'Product Manager',
    company: 'Spotify',
    skills: ['Product Strategy', 'Agile Methodologies', 'User Research', 'Roadmapping'],
    rating: 4.6,
    reviewCount: 22,
    featured: false,
    location: 'London, UK',
    hourlyRate: 65,
    availability: 'Weekdays'
  },
  {
    id: '6',
    name: 'James Wilson',
    title: 'Frontend Architect',
    company: 'Netflix',
    skills: ['React', 'JavaScript', 'UI Architecture', 'Performance Optimization'],
    rating: 4.8,
    reviewCount: 31,
    featured: false,
    location: 'Los Angeles, CA',
    hourlyRate: 80,
    availability: 'Evenings Only'
  }
];

// Filter categories
const categories = [
  "Software Development",
  "Design",
  "Product Management",
  "Marketing",
  "Data Science",
  "Career Development",
  "Leadership"
];

const FindMentors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };
  
  // Toggle filter
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setActiveFilters([]);
  };
  
  // Filter mentors based on search term and selected category
  const filteredMentors = allMentors.filter(mentor => {
    const matchesSearch = searchTerm === '' || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || 
      mentor.skills.some(skill => {
        if (selectedCategory === 'Software Development') 
          return ['React', 'JavaScript', 'Full-Stack Development', 'System Architecture'].includes(skill);
        if (selectedCategory === 'Design')
          return ['UI/UX Design', 'Design Systems'].includes(skill);
        if (selectedCategory === 'Product Management')
          return ['Product Strategy', 'Roadmapping', 'Agile Methodologies'].includes(skill);
        if (selectedCategory === 'Marketing')
          return ['Digital Marketing', 'Brand Strategy', 'Content Creation', 'Analytics'].includes(skill);
        if (selectedCategory === 'Data Science')
          return ['Machine Learning', 'Python', 'Data Analysis', 'AI Ethics'].includes(skill);
        if (selectedCategory === 'Career Development')
          return ['Career Growth', 'Mentorship'].includes(skill);
        if (selectedCategory === 'Leadership')
          return ['Leadership'].includes(skill);
        return false;
      });
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Find Mentors</h1>
              <p className="text-muted-foreground mt-1">
                Connect with experienced professionals who can help you grow
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="w-full md:w-auto min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, skill, or role..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          
          {/* Filters Section */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Additional Filters:</span>
              </div>
              
              {['Available Weekends', 'Under $50/hr', 'Top Rated (4.8+)'].map((filter) => (
                <button
                  key={filter}
                  className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border ${
                    activeFilters.includes(filter) 
                      ? 'bg-primary/10 border-primary text-primary' 
                      : 'bg-card border-input text-muted-foreground'
                  }`}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                  {activeFilters.includes(filter) && (
                    <X className="h-3 w-3" />
                  )}
                </button>
              ))}
              
              {(searchTerm || selectedCategory || activeFilters.length > 0) && (
                <button 
                  className="text-xs text-primary hover:underline"
                  onClick={clearFilters}
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
          
          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredMentors.length} {filteredMentors.length === 1 ? 'mentor' : 'mentors'}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
          
          {/* Mentors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div key={mentor.id} className="bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-xl font-bold">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <Link to={`/mentors/${mentor.id}`} className="font-semibold hover:text-primary">
                          {mentor.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{mentor.title}</p>
                        <p className="text-sm text-muted-foreground">{mentor.company}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mentor.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="badge bg-secondary text-secondary-foreground">
                        {skill}
                      </span>
                    ))}
                    {mentor.skills.length > 3 && (
                      <span className="badge bg-secondary text-secondary-foreground">
                        +{mentor.skills.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm ml-1">{mentor.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1">({mentor.reviewCount})</span>
                    </div>
                    <span className="text-primary font-semibold">${mentor.hourlyRate}/hr</span>
                  </div>
                  
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{mentor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{mentor.availability}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex justify-between">
                    <Link 
                      to={`/mentors/${mentor.id}`} 
                      className="text-primary hover:underline"
                    >
                      View Profile
                    </Link>
                    <button className="btn-outline text-sm py-1 px-3">
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No mentors found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria</p>
              <button 
                className="btn-primary"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindMentors;
