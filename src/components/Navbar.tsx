
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, UserPlus, LogIn, Bell } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const clearNotifications = () => {
    setNotificationCount(0);
  };

  const notifications = [
    {
      id: 1,
      title: "New mentor available",
      message: "Vikram Singh is now available for mentoring in Data Science",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Upcoming event",
      message: "Career growth workshop starting in 2 days",
      time: "1 day ago"
    },
    {
      id: 3,
      title: "New feature available",
      message: "Try our new AI-powered mentor matching system",
      time: "3 days ago"
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 14C20.3137 14 23 11.3137 23 8C23 4.68629 20.3137 2 17 2C13.6863 2 11 4.68629 11 8C11 9.29583 11.3846 10.4957 12.0577 11.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10C3.68629 10 1 12.6863 1 16C1 19.3137 3.68629 22 7 22C10.3137 22 13 19.3137 13 16C13 14.7042 12.6154 13.5043 11.9423 12.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 16C20 18.2091 18.2091 20 16 20C13.7909 20 12 18.2091 12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16Z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold">MentorConnect</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/login" className="text-sm font-medium hover:text-primary">Find Mentors</Link>
          <Link to="/login" className="text-sm font-medium hover:text-primary">Forum</Link>
          <Link to="/login" className="text-sm font-medium hover:text-primary">How It Works</Link>
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative inline-flex items-center justify-center">
                  <Bell className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Notifications</h3>
                    <button 
                      onClick={clearNotifications} 
                      className="text-xs text-primary hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
                <div className="max-h-80 overflow-auto">
                  {notifications.map(notification => (
                    <div key={notification.id} className="p-4 border-b hover:bg-secondary/20 transition-colors cursor-pointer">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t text-center">
                  <Link to="/login" className="text-xs text-primary hover:underline">View all notifications</Link>
                </div>
              </PopoverContent>
            </Popover>
            
            <Link to="/login" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
            <Link to="/signup" className="btn-primary flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden container mx-auto py-4 bg-background">
          <nav className="flex flex-col gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-primary" onClick={toggleMenu}>Find Mentors</Link>
            <Link to="/login" className="text-sm font-medium hover:text-primary" onClick={toggleMenu}>Forum</Link>
            <Link to="/login" className="text-sm font-medium hover:text-primary" onClick={toggleMenu}>How It Works</Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Link to="/login" className="flex items-center gap-1 text-sm font-medium text-primary" onClick={toggleMenu}>
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="btn-primary flex items-center gap-1 justify-center" onClick={toggleMenu}>
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
