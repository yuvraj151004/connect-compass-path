
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { MessageSquare, Search, Filter, Users, Clock, TrendingUp, CheckCircle, ChevronRight, ChevronDown, ArrowUp, MessageCircle, ThumbsUp } from 'lucide-react';

// Sample forum data
const forumCategories = [
  { id: '1', name: 'Career Development', count: 124 },
  { id: '2', name: 'Technical Skills', count: 97 },
  { id: '3', name: 'Leadership', count: 56 },
  { id: '4', name: 'Work-Life Balance', count: 42 },
  { id: '5', name: 'Entrepreneurship', count: 35 },
];

const forumTopics = [
  { 
    id: '1', 
    title: 'How to prepare for a technical interview at FAANG companies?',
    author: 'Alex Rivera',
    authorRole: 'Mentee',
    date: '2 days ago',
    replies: 24,
    views: 342,
    category: 'Technical Skills',
    verified: true,
    trending: true
  },
  { 
    id: '2', 
    title: 'Transitioning from engineering to product management - advice needed',
    author: 'Jamie Kennedy',
    authorRole: 'Mentee',
    date: '1 week ago',
    replies: 18,
    views: 276,
    category: 'Career Development',
    verified: true
  },
  { 
    id: '3', 
    title: 'Best practices for managing remote teams effectively',
    author: 'Dr. Michael Chen',
    authorRole: 'Mentor',
    date: '3 days ago',
    replies: 15,
    views: 189,
    category: 'Leadership',
    verified: false
  },
  { 
    id: '4', 
    title: 'How do you handle burnout while working at a high-growth startup?',
    author: 'Sarah Johnson',
    authorRole: 'Mentor',
    date: '5 days ago',
    replies: 29,
    views: 412,
    category: 'Work-Life Balance',
    verified: true
  },
  { 
    id: '5', 
    title: 'Resources for learning React and modern frontend frameworks',
    author: 'Taylor Swift',
    authorRole: 'Mentee',
    date: '1 day ago',
    replies: 12,
    views: 156,
    category: 'Technical Skills',
    verified: false,
    trending: true
  },
];

const Forum = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };
  
  const filteredTopics = activeCategory 
    ? forumTopics.filter(topic => {
        const category = forumCategories.find(c => c.id === activeCategory);
        return category && topic.category === category.name;
      })
    : forumTopics;
  
  const searchedTopics = searchQuery 
    ? filteredTopics.filter(topic => 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredTopics;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Discussion Forum</h1>
              <p className="text-muted-foreground mt-2">
                Ask questions, share insights, and learn from the community
              </p>
            </div>
            <Link to="/forum/new" className="btn-primary">
              Start a Discussion
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left sidebar - Categories */}
            <div className="lg:w-1/4">
              <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-semibold">Categories</h2>
                </div>
                <div className="p-2">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                      activeCategory === null ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                    onClick={() => setActiveCategory(null)}
                  >
                    <span>All Topics</span>
                    <span className="badge bg-secondary text-secondary-foreground">
                      {forumTopics.length}
                    </span>
                  </button>
                  
                  {forumCategories.map((category) => (
                    <button
                      key={category.id}
                      className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                        activeCategory === category.id ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                      }`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <span>{category.name}</span>
                      <span className={`badge ${
                        activeCategory === category.id 
                          ? 'bg-primary-foreground text-primary' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-card border rounded-lg shadow-sm overflow-hidden mt-4">
                <div className="p-4 border-b">
                  <h2 className="font-semibold">Helpful Links</h2>
                </div>
                <div className="p-4 space-y-3">
                  <Link to="/forum/guidelines" className="text-primary hover:underline flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Community Guidelines
                  </Link>
                  <Link to="/faq" className="text-primary hover:underline flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Frequently Asked Questions
                  </Link>
                  <Link to="/forum/mentors" className="text-primary hover:underline flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Active Mentors in Forum
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Main content - Discussion list */}
            <div className="lg:w-3/4">
              <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search discussions..."
                        className="w-full pl-9 pr-4 py-2 border border-input rounded-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-outline flex items-center gap-1">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                      </button>
                      <select className="border border-input rounded-md px-3 py-2 bg-background">
                        <option value="recent">Most Recent</option>
                        <option value="popular">Most Popular</option>
                        <option value="replies">Most Replies</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {searchedTopics.length > 0 ? (
                  <div>
                    {searchedTopics.map((topic, index) => (
                      <div 
                        key={topic.id} 
                        className={`p-4 hover:bg-secondary/30 transition-colors ${
                          index < searchedTopics.length - 1 ? 'border-b' : ''
                        }`}
                      >
                        <div className="flex gap-4">
                          <div className="hidden sm:flex flex-col items-center justify-center w-14 text-center">
                            <button className="text-muted-foreground hover:text-primary">
                              <ArrowUp className="h-6 w-6" />
                            </button>
                            <span className="font-bold text-lg">{topic.replies}</span>
                            <span className="text-xs text-muted-foreground">replies</span>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <Link 
                                to={`/forum/topic/${topic.id}`} 
                                className="text-lg font-semibold hover:text-primary"
                              >
                                {topic.title}
                              </Link>
                              
                              <div className="flex flex-wrap gap-2">
                                <span className="badge bg-secondary text-secondary-foreground">
                                  {topic.category}
                                </span>
                                
                                {topic.verified && (
                                  <span className="badge bg-success/10 text-success flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3" />
                                    Verified Answer
                                  </span>
                                )}
                                
                                {topic.trending && (
                                  <span className="badge bg-primary/10 text-primary flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    Trending
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                              <span>
                                by <span className="font-medium text-foreground">{topic.author}</span> 
                                <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                                  topic.authorRole === 'Mentor' 
                                    ? 'bg-mentor/10 text-mentor' 
                                    : 'bg-mentee/10 text-mentee'
                                }`}>
                                  {topic.authorRole}
                                </span>
                              </span>
                              
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {topic.date}
                              </span>
                              
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-3.5 w-3.5" />
                                {topic.replies} replies
                              </span>
                              
                              <span className="flex items-center gap-1">
                                <Users className="h-3.5 w-3.5" />
                                {topic.views} views
                              </span>
                            </div>
                          </div>
                          
                          <div className="hidden lg:flex items-center">
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-4 border-t flex justify-between items-center">
                      <button className="text-sm text-primary hover:underline">Previous</button>
                      <div className="flex items-center gap-1">
                        <span className="px-3 py-1 rounded-md bg-primary text-primary-foreground">1</span>
                        <span className="px-3 py-1 rounded-md hover:bg-secondary">2</span>
                        <span className="px-3 py-1 rounded-md hover:bg-secondary">3</span>
                        <span>...</span>
                        <span className="px-3 py-1 rounded-md hover:bg-secondary">12</span>
                      </div>
                      <button className="text-sm text-primary hover:underline">Next</button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No discussions found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery 
                        ? `No discussions match "${searchQuery}"`
                        : 'There are no discussions in this category yet'}
                    </p>
                    <Link to="/forum/new" className="btn-primary">
                      Start a Discussion
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Trending Topics */}
              <div className="mt-6 bg-card border rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Trending Topics
                  </h2>
                </div>
                
                <div className="divide-y">
                  {forumTopics.filter(topic => topic.trending).map((topic) => (
                    <div key={topic.id} className="p-4 hover:bg-secondary/30 transition-colors">
                      <Link to={`/forum/topic/${topic.id}`} className="font-medium hover:text-primary">
                        {topic.title}
                      </Link>
                      <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="badge bg-secondary text-secondary-foreground">
                          {topic.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          {topic.replies * 3} likes
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5" />
                          {topic.replies} replies
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Forum;
