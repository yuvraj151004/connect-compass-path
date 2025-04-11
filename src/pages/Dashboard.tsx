
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Calendar, MessageCircle, Users, User, Award, Clock, Bookmark, BarChart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MyMentors from './dashboard/Mentors';
import Schedule from './dashboard/Schedule';

const DashboardHome = () => {
  // Get the role from location state
  const location = useLocation();
  const userRole = location.state?.userRole || 'mentee';
  
  // Some sample data for the dashboard
  const upcomingMeetings = [
    {
      id: '1',
      mentor: userRole === 'mentor' ? 'Your Mentee: James Wilson' : 'Sarah Johnson',
      date: '2025-04-15T14:00:00',
      duration: 60, // minutes
      topic: userRole === 'mentor' ? 'Career Guidance Session' : 'Career Development Discussion'
    },
    {
      id: '2',
      mentor: userRole === 'mentor' ? 'Your Mentee: Emily Parker' : 'Michael Chen',
      date: '2025-04-18T10:30:00',
      duration: 45, // minutes
      topic: userRole === 'mentor' ? 'Technical Skills Review' : 'Technical Interview Preparation'
    }
  ];
  
  const recentMessages = [
    {
      id: '1',
      from: userRole === 'mentor' ? 'James Wilson' : 'Sarah Johnson',
      message: userRole === 'mentor' 
        ? 'Thank you for the feedback on my resume!' 
        : 'Looking forward to our session next week!',
      time: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      from: userRole === 'mentor' ? 'Emily Parker' : 'Michael Chen',
      message: userRole === 'mentor'
        ? 'When can we schedule our next session?'
        : "I've shared some resources ahead of our meeting.",
      time: '1 day ago',
      unread: false
    }
  ];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, John!</h1>
          <p className="text-muted-foreground">
            {userRole === 'mentee' 
              ? "Here's an overview of your mentorship journey."
              : "Here's an overview of your mentoring activity."}
          </p>
        </div>
        {userRole === 'mentee' ? (
          <Link to="/mentors" className="btn-primary shrink-0 self-start">
            Find More Mentors
          </Link>
        ) : (
          <Link to="/dashboard/schedule" className="btn-primary shrink-0 self-start bg-mentor">
            Schedule a Session
          </Link>
        )}
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: userRole === 'mentee' ? 'Active Mentors' : 'Active Mentees',
            value: userRole === 'mentee' ? '2' : '5',
            icon: <Users className="h-5 w-5" />,
            color: 'bg-primary/10 text-primary'
          },
          {
            title: 'Upcoming Sessions',
            value: '3',
            icon: <Calendar className="h-5 w-5" />,
            color: userRole === 'mentee' ? 'bg-mentee/10 text-mentee' : 'bg-mentor/10 text-mentor'
          },
          {
            title: 'Session Hours',
            value: userRole === 'mentee' ? '12' : '24',
            icon: <Clock className="h-5 w-5" />,
            color: userRole === 'mentee' ? 'bg-mentor/10 text-mentor' : 'bg-mentor/10 text-mentor'
          },
          {
            title: userRole === 'mentee' ? 'Badges Earned' : 'Rating',
            value: userRole === 'mentee' ? '4' : '4.8/5',
            icon: userRole === 'mentee' ? <Award className="h-5 w-5" /> : <BarChart className="h-5 w-5" />,
            color: 'bg-success/10 text-success'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-card border rounded-lg p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Meetings */}
        <div className="lg:col-span-2 bg-card border rounded-lg shadow-sm overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Sessions
            </h2>
            <Link to="/dashboard/schedule" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="p-5">
            {upcomingMeetings.length > 0 ? (
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
                      <span className="font-medium text-sm">
                        {meeting.mentor.split(':').length > 1 
                          ? meeting.mentor.split(':')[1].trim().split(' ').map(n => n[0]).join('')
                          : meeting.mentor.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <h3 className="font-medium">{meeting.topic}</h3>
                          <p className="text-sm text-muted-foreground">with {meeting.mentor}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{meeting.duration} min</span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-3">
                        <span className="inline-flex items-center text-sm bg-secondary text-secondary-foreground rounded-md px-2 py-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {formatDate(meeting.date)}
                        </span>
                        <button className={`inline-flex items-center text-sm ${userRole === 'mentor' ? 'bg-mentor/10 text-mentor' : 'bg-primary/10 text-primary'} rounded-md px-2 py-1 hover:bg-primary/20 transition-colors`}>
                          Join Meeting
                        </button>
                        <button className="inline-flex items-center text-sm bg-secondary text-secondary-foreground rounded-md px-2 py-1 hover:bg-secondary/80 transition-colors">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No upcoming meetings scheduled.</p>
                <button className="btn-primary mt-3">Schedule a Session</button>
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Messages */}
        <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Recent Messages
            </h2>
            <Link to="/dashboard/messages" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="p-5">
            {recentMessages.length > 0 ? (
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex gap-3 border-b pb-4 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
                      <span className="font-medium text-sm">
                        {message.from.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{message.from}</h3>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{message.message}</p>
                      <div className="mt-2">
                        <Link to={`/dashboard/messages/${message.id}`} className="text-sm text-primary hover:underline">
                          Reply
                        </Link>
                      </div>
                    </div>
                    {message.unread && (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No recent messages.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Suggested Resources / Quick Links */}
      <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-primary" />
            {userRole === 'mentee' ? 'Recommended Resources' : 'Mentor Resources'}
          </h2>
        </div>
        <div className="p-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userRole === 'mentee' ? [
              {
                title: 'Interview Preparation Guide',
                description: 'A comprehensive guide to ace your technical interviews.',
                link: '/resources/interviews'
              },
              {
                title: 'Resume Building Workshop',
                description: 'Learn how to craft a resume that stands out to recruiters.',
                link: '/resources/resume'
              },
              {
                title: 'Career Transition Stories',
                description: 'Success stories from mentees who changed careers successfully.',
                link: '/success-stories'
              }
            ] : [
              {
                title: 'Effective Mentoring Guide',
                description: 'Best practices and strategies for impactful mentoring sessions.',
                link: '/mentor-resources/guide'
              },
              {
                title: 'Mentee Progress Tracker',
                description: 'Tools to track and document mentee growth and achievements.',
                link: '/mentor-resources/tracker'
              },
              {
                title: 'Teaching Techniques',
                description: 'Advanced techniques for explaining complex concepts effectively.',
                link: '/mentor-resources/teaching'
              }
            ].map((resource, index) => (
              <div key={index} className="border rounded-md p-4 hover:border-primary/20 hover:shadow-sm transition-all">
                <h3 className="font-medium mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                <Link to={resource.link} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  View Resource
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  // Get the user role from location state
  const location = useLocation();
  const userRole = location.state?.userRole || 'mentee';
  
  return (
    <DashboardLayout userRole={userRole}>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/mentors" element={<MyMentors />} />
        <Route path="/schedule" element={<Schedule />} />
        {/* Add routes for messages and other dashboard pages */}
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
