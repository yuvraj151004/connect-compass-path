
import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Compass, Users, CalendarClock, MessageSquare, Settings, Bell, ChevronDown, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DashboardLayout from '@/components/DashboardLayout';
import Schedule from './dashboard/Schedule';
import Messages from './dashboard/Messages';
import Mentors from './dashboard/Mentors';
import NewSession from './dashboard/NewSession';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'mentee' | 'mentor'>(
    (localStorage.getItem('userRole') as 'mentee' | 'mentor') || 'mentee'
  );

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "/placeholder.svg",
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6">
        <Routes>
          <Route path="/" element={<Mentors />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/new-session" element={<NewSession />} />
        </Routes>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
