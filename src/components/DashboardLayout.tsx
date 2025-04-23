import React, { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  MessageCircle, 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User, 
  Briefcase
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: 'mentor' | 'mentee';
  userName?: string;
  onLogout?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  userRole = 'mentee', 
  userName = 'User',
  onLogout 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menteeNavItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/dashboard' },
    { label: 'My Mentors', icon: <Users className="h-5 w-5" />, path: '/dashboard/mentors' },
    { label: 'Schedule', icon: <Calendar className="h-5 w-5" />, path: '/dashboard/schedule' },
    { label: 'Messages', icon: <MessageCircle className="h-5 w-5" />, path: '/dashboard/messages' },
    { label: 'Forum', icon: <MessageCircle className="h-5 w-5" />, path: '/forum' },
  ];

  const mentorNavItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/dashboard' },
    { label: 'My Mentees', icon: <Users className="h-5 w-5" />, path: '/dashboard/mentees' },
    { label: 'Schedule', icon: <Calendar className="h-5 w-5" />, path: '/dashboard/schedule' },
    { label: 'Messages', icon: <MessageCircle className="h-5 w-5" />, path: '/dashboard/messages' },
    { label: 'Forum', icon: <MessageCircle className="h-5 w-5" />, path: '/forum' },
  ];

  const navItems = userRole === 'mentor' ? mentorNavItems : menteeNavItems;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('userRole');
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out from your account.",
      });
      
      navigate('/');
    }
  };

  const roleColor = userRole === 'mentor' ? 'bg-mentor text-white' : 'bg-mentee text-white';

  return (
    <div className="min-h-screen bg-background flex">
      <aside 
        className={`bg-card border-r w-64 fixed h-full z-30 transition-transform duration-300 transform lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 14C20.3137 14 23 11.3137 23 8C23 4.68629 20.3137 2 17 2C13.6863 2 11 4.68629 11 8C11 9.29583 11.3846 10.4957 12.0577 11.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10C3.68629 10 1 12.6863 1 16C1 19.3137 3.68629 22 7 22C10.3137 22 13 19.3137 13 16C13 14.7042 12.6154 13.5043 11.9423 12.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 16C20 18.2091 18.2091 20 16 20C13.7909 20 12 18.2091 12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg font-bold">MentorConnect</span>
            </Link>
            <button 
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4 border-b">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColor}`}>
              {userRole === 'mentor' ? (
                <>
                  <Briefcase className="h-3 w-3 mr-1" />
                  Mentor
                </>
              ) : (
                <>
                  <User className="h-3 w-3 mr-1" />
                  Mentee
                </>
              )}
            </span>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="border-t my-4"></div>
            <Link
              to="/settings"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                location.pathname === '/settings'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>
      
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <header className="bg-card border-b sticky top-0 z-20">
          <div className="px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden text-muted-foreground hover:text-foreground"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-bold hidden sm:block">
                {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center gap-3 ml-2">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-medium text-sm">VS</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Vikram Sharma</p>
                <p className="text-xs text-muted-foreground">vikram.sharma@example.com</p>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
