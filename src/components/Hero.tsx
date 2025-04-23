
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Find Your Perfect Mentor <span className="text-primary">Connect</span> and Grow
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px]">
            MentorConnect pairs you with experienced mentors in your field, helping you achieve your goals through personalized guidance, scheduled sessions, and continuous support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login?role=mentee" className="btn-mentee flex items-center justify-center gap-2">
              <span>Find a Mentor</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/login?role=mentor" className="btn-mentor flex items-center justify-center gap-2">
              <span>Become a Mentor</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-background flex items-center justify-center overflow-hidden">
                  <svg className="w-full h-full text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              ))}
            </div>
            <p>Join over <span className="font-medium text-foreground">2,500+</span> mentees and mentors</p>
          </div>
        </div>
        <div className="relative lg:h-[500px] animate-fade-in">
          <div className="relative z-10 bg-white rounded-lg shadow-xl overflow-hidden card-hover">
            <div className="px-6 py-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Priya Sharma</h3>
                  <p className="text-muted-foreground text-sm">Product Design Lead at Google</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <p className="text-sm">Areas of expertise:</p>
                <div className="flex flex-wrap gap-2">
                  {["UI/UX Design", "Product Strategy", "Career Growth", "Leadership"].map((tag) => (
                    <span key={tag} className="badge bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="h-px bg-border my-4"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star} 
                        className="w-4 h-4 text-yellow-400" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm font-medium ml-1">4.9 (42 reviews)</span>
                  </div>
                  <Link to="/login" className="btn-primary text-sm py-1">View Profile</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-1/4 -right-12 z-0 w-72 h-72 bg-mentor-light/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 -left-12 z-0 w-72 h-72 bg-mentee-light/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
