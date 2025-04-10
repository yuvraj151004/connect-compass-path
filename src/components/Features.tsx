
import React from 'react';
import { Calendar, Video, Award, Search, MessageSquare, BarChart } from 'lucide-react';

const features = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Smart Scheduling",
    description: "Book sessions with mentors based on their availability and get calendar reminders for upcoming meetings."
  },
  {
    icon: <Video className="h-6 w-6" />,
    title: "Video Sessions",
    description: "Connect face-to-face with your mentor through our integrated video call platform for effective communication."
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Discussion Forum",
    description: "Ask questions, share insights, and learn from the community in our moderated discussion forums."
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Smart Matching",
    description: "Our algorithm matches you with the perfect mentor based on your goals, interests, and learning style."
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Growth Tracking",
    description: "Track your progress with milestones, earn badges for achievements, and celebrate your growth journey."
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Personalized Dashboard",
    description: "Access all your mentorship resources, chats, and scheduled sessions from one convenient location."
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-secondary/50" id="features">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Powerful Features for Effective Mentorship</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Our platform is designed to make mentorship accessible, effective, and rewarding for both mentors and mentees.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card rounded-lg p-6 shadow-sm card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
