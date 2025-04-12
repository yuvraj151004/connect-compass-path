
import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import Schedule from './dashboard/Schedule';
import Messages from './dashboard/Messages';
import Mentors from './dashboard/Mentors';
import Mentees from './dashboard/Mentees';
import NewSession from './dashboard/NewSession';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'mentee' | 'mentor'>(
    (localStorage.getItem('userRole') as 'mentee' | 'mentor') || 'mentee'
  );

  useEffect(() => {
    // Check if userRole is present in localStorage on component mount
    const storedRole = localStorage.getItem('userRole') as 'mentee' | 'mentor';
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  return (
    <DashboardLayout userRole={userRole}>
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
