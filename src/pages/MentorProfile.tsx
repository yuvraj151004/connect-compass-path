
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, MessageCircle, Star, Clock, Briefcase, Award, MapPin, Globe, ChevronLeft, Users, Book, Check } from 'lucide-react';

const MentorProfile = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch the mentor data based on the ID
  const mentor = {
    id: id || '1',
    name: 'Sarah Johnson',
    title: 'Product Design Lead',
    company: 'Google',
    location: 'San Francisco, CA',
    languages: ['English', 'Spanish'],
    bio: 'I'm a Product Design Lead with over 8 years of experience in the tech industry. I've helped build products used by millions and led design teams at both startups and large corporations. My passion is helping designers level up their skills and navigate their career path in the tech industry.',
    expertise: [
      'UI/UX Design',
      'Product Strategy',
      'Career Growth',
      'Leadership',
      'Design Systems',
      'UX Research'
    ],
    experience: [
      {
        role: 'Product Design Lead',
        company: 'Google',
        period: '2022 - Present'
      },
      {
        role: 'Senior Product Designer',
        company: 'Airbnb',
        period: '2019 - 2022'
      },
      {
        role: 'Product Designer',
        company: 'Dropbox',
        period: '2017 - 2019'
      }
    ],
    education: [
      {
        degree: 'MS, Human-Computer Interaction',
        school: 'Stanford University',
        year: '2017'
      },
      {
        degree: 'BA, Graphic Design',
        school: 'Rhode Island School of Design',
        year: '2015'
      }
    ],
    mentorshipAreas: [
      'Career transitions into Product Design',
      'Building your design portfolio',
      'Preparing for design interviews',
      'Leadership skills for designers',
      'Work-life balance in tech'
    ],
    availability: {
      schedule: [
        { day: 'Monday', slots: ['6:00 PM - 7:00 PM'] },
        { day: 'Wednesday', slots: ['5:30 PM - 6:30 PM', '7:00 PM - 8:00 PM'] },
        { day: 'Saturday', slots: ['10:00 AM - 11:00 AM', '2:00 PM - 3:00 PM'] }
      ],
      timezone: 'Pacific Time (PT)'
    },
    rating: 4.9,
    reviewCount: 42,
    reviews: [
      {
        id: '1',
        author: 'Alex Chen',
        rating: 5,
        date: '2 months ago',
        text: 'Sarah was incredibly helpful in helping me prepare for my design interviews. Her feedback on my portfolio was invaluable, and I ended up getting offers from multiple companies!'
      },
      {
        id: '2',
        author: 'Maria Lopez',
        rating: 5,
        date: '4 months ago',
        text: 'I was transitioning from graphic design to UX design, and Sarah provided excellent guidance throughout the process. She shared practical resources and gave constructive feedback that helped me land my first UX role.'
      },
      {
        id: '3',
        author: 'Jamal Thompson',
        rating: 4,
        date: '6 months ago',
        text: 'Sarah is a knowledgeable mentor who provides actionable advice. Our sessions were always well-structured, and she was generous with sharing her industry insights.'
      }
    ],
    sessionRate: '$75 / hour',
    sessionLength: 60, // minutes
    completedSessions: 86
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto">
          <Link to="/mentors" className="inline-flex items-center text-primary hover:underline mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Mentors
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column - Mentor info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Header */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="sm:flex items-start gap-6">
                  <div className="w-24 h-24 mb-4 sm:mb-0 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold mx-auto sm:mx-0">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl font-bold">{mentor.name}</h1>
                    <p className="text-muted-foreground mt-1">{mentor.title} at {mentor.company}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                      <span className="badge bg-secondary text-secondary-foreground inline-flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {mentor.location}
                      </span>
                      <span className="badge bg-secondary text-secondary-foreground inline-flex items-center">
                        <Globe className="h-3 w-3 mr-1" />
                        {mentor.languages.join(', ')}
                      </span>
                      <span className="badge bg-secondary text-secondary-foreground inline-flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {mentor.completedSessions} sessions
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center sm:justify-start mt-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} 
                            className={`h-4 w-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-2 font-medium">{mentor.rating.toFixed(1)}</span>
                        <span className="ml-1 text-muted-foreground">({mentor.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h2 className="font-semibold mb-3">About</h2>
                  <p className="text-muted-foreground">{mentor.bio}</p>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h2 className="font-semibold mb-3">Areas of Expertise</h2>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span key={index} className="badge bg-primary/10 text-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Experience & Education */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Experience & Education
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium mb-3">Work Experience</h3>
                    <div className="space-y-4">
                      {mentor.experience.map((exp, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium">{exp.role}</h4>
                            <p className="text-muted-foreground text-sm">{exp.company} • {exp.period}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-md font-medium mb-3">Education</h3>
                    <div className="space-y-4">
                      {mentor.education.map((edu, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium">{edu.degree}</h4>
                            <p className="text-muted-foreground text-sm">{edu.school} • {edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mentorship Areas */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Book className="h-5 w-5 text-primary" />
                  Mentorship Focus Areas
                </h2>
                
                <div className="space-y-2">
                  {mentor.mentorshipAreas.map((area, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reviews */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Reviews ({mentor.reviewCount})
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    Average Rating: <span className="font-medium text-foreground">{mentor.rating.toFixed(1)}/5</span>
                  </span>
                </div>
                
                <div className="space-y-6">
                  {mentor.reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <span className="font-medium text-sm">
                              {review.author.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium">{review.author}</h3>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} 
                                    className={`h-3.5 w-3.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                  
                  <div className="text-center">
                    <button className="text-primary hover:underline">
                      View All Reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Booking and contact */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card border rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="font-semibold mb-4">Book a Session</h2>
                
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{mentor.sessionLength} min session</span>
                  <span className="text-xl font-bold ml-auto">{mentor.sessionRate}</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <h3 className="text-sm font-medium">Available this week:</h3>
                  <div className="space-y-3">
                    {mentor.availability.schedule.map((day, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <p className="font-medium mb-2">{day.day}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {day.slots.map((slot, slotIndex) => (
                            <button 
                              key={slotIndex} 
                              className="text-xs border border-input rounded-md py-1.5 px-2 hover:bg-secondary transition-colors"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All times shown in {mentor.availability.timezone}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule a Session
                  </button>
                  <button className="btn-outline w-full flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Message {mentor.name.split(' ')[0]}
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t space-y-4">
                  <h3 className="font-medium">Session information</h3>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{mentor.completedSessions} mentorship sessions completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Usually responds within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Verified mentor profile</span>
                  </div>
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

export default MentorProfile;
