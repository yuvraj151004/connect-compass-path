import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import Schedule from './dashboard/Schedule';
import Messages from './dashboard/Messages';
import Mentors from './dashboard/Mentors';
import Mentees from './dashboard/Mentees';
import NewSession from './dashboard/NewSession';
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'mentee' | 'mentor'>(
    (localStorage.getItem('userRole') as 'mentee' | 'mentor') || 'mentee'
  );
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    toast.success("You've been successfully logged out");
    navigate('/');
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') as 'mentee' | 'mentor';
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  return (
    <DashboardLayout 
      userRole={userRole}
      onLogout={handleLogout}
      userName={userRole === 'mentor' ? 'Rajesh Kumar' : 'Priya Sharma'}
    >
      <div className="space-y-6">
        <Routes>
          <Route path="/" element={userRole === 'mentor' ? <Mentees /> : <Mentors />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mentees" element={<Mentees />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/new-session" element={<NewSession />} />
        </Routes>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
