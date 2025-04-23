
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings, LogOut } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName: string;
  userRole: 'mentee' | 'mentor';
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  userName, 
  userRole,
  onLogout 
}) => {
  const [notificationCount, setNotificationCount] = React.useState(3);

  const clearNotifications = () => {
    setNotificationCount(0);
  };

  const notifications = [
    {
      id: 1,
      title: "New session request",
      message: userRole === 'mentor' 
        ? "Priya Sharma wants to schedule a session with you" 
        : "Vikram Mehta accepted your session request",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Upcoming session",
      message: "You have a session scheduled tomorrow at 3:00 PM",
      time: "1 day ago"
    },
    {
      id: 3,
      title: "New message",
      message: userRole === 'mentor' 
        ? "You received a message from Arjun Patel" 
        : "You received a message from Neha Gupta",
      time: "3 days ago"
    }
  ];

  const userInitials = userName
    .split(' ')
    .map(name => name[0])
    .join('');

  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
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
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={userRole === 'mentor' 
                ? "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=100&h=100" 
                : "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&h=100"} 
              />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block font-medium">{userName}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout} className="text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardHeader;
