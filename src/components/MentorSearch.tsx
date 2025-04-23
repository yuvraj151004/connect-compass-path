
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface MentorSearchProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  skills: string[];
  rating: number | null;
  availability: string[];
}

const MentorSearch: React.FC<MentorSearchProps> = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    skills: [],
    rating: null,
    availability: []
  });

  const skillOptions = [
    'React', 'JavaScript', 'Python', 'Data Science', 'Machine Learning', 
    'Product Management', 'UX Design', 'Marketing', 'Leadership', 'Career Growth'
  ];
  
  const availabilityOptions = [
    'Weekdays', 'Weekends', 'Mornings', 'Evenings', 'Flexible'
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const toggleSkill = (skill: string) => {
    const updatedSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    
    const updatedFilters = { ...filters, skills: updatedSkills };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const toggleAvailability = (availability: string) => {
    const updatedAvailability = filters.availability.includes(availability)
      ? filters.availability.filter(a => a !== availability)
      : [...filters.availability, availability];
    
    const updatedFilters = { ...filters, availability: updatedAvailability };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const setRating = (rating: number | null) => {
    const updatedFilters = { ...filters, rating };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      skills: [],
      rating: null,
      availability: []
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search mentors by name, skills, or company..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2 rounded-md border flex items-center gap-1 ${
            showFilters || filters.skills.length > 0 || filters.rating !== null || filters.availability.length > 0
              ? 'bg-primary text-primary-foreground'
              : 'bg-background'
          }`}
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {(filters.skills.length > 0 || filters.rating !== null || filters.availability.length > 0) && (
            <span className="bg-secondary text-secondary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {filters.skills.length + (filters.rating !== null ? 1 : 0) + filters.availability.length}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Filters</h3>
            <button onClick={clearFilters} className="text-sm text-primary flex items-center gap-1">
              <X className="h-3 w-3" /> Clear all
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`text-xs px-3 py-1 rounded-full ${
                    filters.skills.includes(skill)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Minimum Rating</h4>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setRating(filters.rating === rating ? null : rating)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    filters.rating === rating
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Availability</h4>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map(availability => (
                <button
                  key={availability}
                  onClick={() => toggleAvailability(availability)}
                  className={`text-xs px-3 py-1 rounded-full ${
                    filters.availability.includes(availability)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {availability}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorSearch;
