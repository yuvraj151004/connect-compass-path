
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, CheckCircle, Lightbulb, Users, Calendar, MessageCircle, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How MentorConnect Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Our platform makes it easy to find the perfect mentor and start your growth journey in just a few simple steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup?role=mentee" className="btn-primary">Find a Mentor</Link>
              <Link to="/signup?role=mentor" className="btn-secondary">Become a Mentor</Link>
            </div>
          </div>
        </section>
        
        {/* Process Steps */}
        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">The Mentorship Process</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: "Create Your Profile",
                  description: "Sign up and create your profile highlighting your goals, interests, and what you're looking to learn.",
                  icon: <Users className="h-12 w-12" />
                },
                {
                  step: 2,
                  title: "Find Your Perfect Match",
                  description: "Browse our curated list of mentors or use our matching algorithm to find the perfect mentor for your needs.",
                  icon: <Lightbulb className="h-12 w-12" />
                },
                {
                  step: 3,
                  title: "Schedule Sessions",
                  description: "Book sessions with your mentor based on their availability and start your mentorship journey.",
                  icon: <Calendar className="h-12 w-12" />
                },
                {
                  step: 4,
                  title: "Connect & Learn",
                  description: "Meet with your mentor through video calls or chat. Share your challenges and receive personalized guidance.",
                  icon: <MessageCircle className="h-12 w-12" />
                },
                {
                  step: 5,
                  title: "Track Your Progress",
                  description: "Set goals with your mentor and track your progress over time. Celebrate milestones with achievement badges.",
                  icon: <Award className="h-12 w-12" />
                },
                {
                  step: 6,
                  title: "Grow & Pay It Forward",
                  description: "As you develop your skills, consider becoming a mentor yourself to help others on their journey.",
                  icon: <ArrowRight className="h-12 w-12" />
                }
              ].map((item) => (
                <div key={item.step} className="bg-card border rounded-lg p-6 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {item.icon}
                  </div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </span>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Benefits of Structured Mentorship</h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
              Research shows that mentorship significantly increases career success and satisfaction.
              Here's why our structured approach works:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">For Mentees</h3>
                <ul className="space-y-4">
                  {[
                    "Access to experienced professionals in your field",
                    "Personalized guidance tailored to your specific goals",
                    "Accelerated learning and skill development",
                    "Network expansion and industry connections",
                    "Increased confidence and career clarity",
                    "Accountability and structured progress tracking"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">For Mentors</h3>
                <ul className="space-y-4">
                  {[
                    "Develop leadership and coaching skills",
                    "Gain fresh perspectives and insights",
                    "Build your professional reputation",
                    "Give back to your professional community",
                    "Strengthen your own knowledge through teaching",
                    "Connect with motivated professionals in your field"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  question: "How much does it cost to use MentorConnect?",
                  answer: "MentorConnect offers both free and paid mentorship options. Mentors set their own rates, and some offer pro-bono sessions. You can filter by price range when searching for mentors."
                },
                {
                  question: "How are mentors vetted?",
                  answer: "All mentors go through a verification process that includes identity verification, experience validation, and a review of their professional background. We also collect and display feedback from mentees."
                },
                {
                  question: "What happens if the mentorship isn't working out?",
                  answer: "We understand that not every match will be perfect. If you feel your mentorship isn't working out, you can end the relationship at any time and find a new mentor without any penalty."
                },
                {
                  question: "How long does a typical mentorship last?",
                  answer: "The duration varies based on your goals. Some mentees benefit from just a few sessions for specific advice, while others maintain long-term relationships with their mentors spanning months or even years."
                },
                {
                  question: "Can I be both a mentor and a mentee?",
                  answer: "Absolutely! Many of our users both give and receive mentorship. This dual role can be especially valuable as you advance in your career."
                },
                {
                  question: "How do I prepare for my first mentorship session?",
                  answer: "We provide a preparation guide for your first session, including suggested questions and topics. The key is to come with clear goals and specific questions to make the most of your time."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-card border rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Mentorship Journey?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of professionals who are accelerating their growth through meaningful mentorship connections.
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
