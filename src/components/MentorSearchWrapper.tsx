
import React, { useState } from 'react';
import MentorSearch, { FilterOptions } from './MentorSearch';

interface MentorSearchWrapperProps {
  onSearchResults: (results: any[]) => void;
  mentors: any[];
}

const MentorSearchWrapper: React.FC<MentorSearchWrapperProps> = ({ onSearchResults, mentors }) => {
  const handleSearch = (query: string) => {
    if (!query) {
      onSearchResults(mentors);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const results = mentors.filter(mentor => 
      mentor.name.toLowerCase().includes(lowerQuery) ||
      mentor.title.toLowerCase().includes(lowerQuery) ||
      mentor.company?.toLowerCase().includes(lowerQuery) ||
      mentor.skills.some((skill: string) => skill.toLowerCase().includes(lowerQuery))
    );
    
    onSearchResults(results);
  };
  
  const handleFilter = (filters: FilterOptions) => {
    let results = [...mentors];
    
    // Filter by skills
    if (filters.skills.length > 0) {
      results = results.filter(mentor => 
        mentor.skills.some((skill: string) => filters.skills.includes(skill))
      );
    }
    
    // Filter by rating
    if (filters.rating !== null) {
      results = results.filter(mentor => mentor.rating >= filters.rating);
    }
    
    // Filter by availability (if we had that data in our mentor objects)
    // In a real implementation, we would filter by availability as well
    
    onSearchResults(results);
  };
  
  return <MentorSearch onSearch={handleSearch} onFilter={handleFilter} />;
};

export default MentorSearchWrapper;
