
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import MentorCard from '../components/MentorCard';
import Footer from '../components/Footer';
import { ChevronRight, Check, Search } from 'lucide-react';

// Sample data for featured mentors
const featuredMentors = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Product Design Lead',
    company: 'Google',
    skills: ['UI/UX Design', 'Product Strategy', 'Career Growth', 'Leadership'],
    rating: 4.9,
    reviewCount: 42,
    featured: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Senior Software Engineer',
    company: 'Microsoft',
    skills: ['Full-Stack Development', 'System Architecture', 'React', 'Mentorship'],
    rating: 4.8,
    reviewCount: 35,
    featured: true
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Marketing Director',
    company: 'Adobe',
    skills: ['Digital Marketing', 'Brand Strategy', 'Content Creation', 'Analytics'],
    rating: 4.7,
    reviewCount: 29,
    featured: false
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <Hero />
        
        <Features />
        
        {/* How It Works Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">How MentorConnect Works</h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Our platform makes it easy to find the perfect mentor and start your growth journey in just a few simple steps.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: "Create Your Profile",
                  description: "Sign up and create your profile highlighting your goals, interests, and what you're looking to learn.",
                  icon: <User className="h-6 w-6" />
                },
                {
                  step: 2,
                  title: "Find Your Mentor",
                  description: "Browse our curated list of mentors or use our matching algorithm to find the perfect mentor for your needs.",
                  icon: <Search className="h-6 w-6" />
                },
                {
                  step: 3,
                  title: "Schedule Sessions",
                  description: "Book sessions with your mentor based on their availability and start your mentorship journey.",
                  icon: <Calendar className="h-6 w-6" />
                }
              ].map((item, index) => (
                <div key={index} className="relative flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <span className="text-xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  
                  {/* Connector line for desktop */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-border">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Mentors */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold">Featured Mentors</h2>
                <p className="text-muted-foreground mt-2">
                  Connect with our top-rated mentors to accelerate your growth.
                </p>
              </div>
              <Link to="/mentors" className="btn-primary flex items-center gap-1">
                <span>View All Mentors</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMentors.map((mentor) => (
                <MentorCard key={mentor.id} {...mentor} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-background">
          <div className="container mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Real stories from mentees and mentors who have experienced the power of MentorConnect.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  quote: "Finding a mentor changed my career trajectory. The guidance I received helped me land my dream job at a top tech company.",
                  author: "Alex Rivera",
                  role: "Software Developer",
                  image: null
                },
                {
                  quote: "As a mentor, I find incredible fulfillment in helping others grow. The platform makes it easy to connect with mentees who truly benefit from my experience.",
                  author: "Dr. Lisa Wang",
                  role: "Data Science Director",
                  image: null
                },
                {
                  quote: "The structured approach to mentorship on this platform helped me stay accountable and make consistent progress toward my goals.",
                  author: "Jamie Taylor",
                  role: "Marketing Specialist",
                  image: null
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-card p-6 rounded-lg border shadow-sm">
                  <div className="flex items-center gap-1 mb-4 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-foreground italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                      {testimonial.image ? (
                        <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-medium text-sm">
                          {testimonial.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Mentorship Journey?</h2>
              <p className="text-primary-foreground/80 text-lg">
                Join thousands of mentors and mentees who are transforming their careers and lives through meaningful connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup?role=mentee" className="btn-primary bg-white text-primary border-2 border-white hover:bg-transparent hover:text-white">
                  Find a Mentor
                </Link>
                <Link to="/signup?role=mentor" className="btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-primary">
                  Become a Mentor
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
