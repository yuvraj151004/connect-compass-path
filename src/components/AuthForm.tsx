
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, LogIn, Mail, Lock, User, Briefcase } from 'lucide-react';
import Link from './Link'; // Import our custom Link component

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultRole = searchParams.get('role') || 'mentee';

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: defaultRole
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    console.log("Form submitted with data:", formData);
    
    // Save user role to localStorage
    localStorage.setItem('userRole', formData.role);
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-card border rounded-lg shadow-sm p-6 md:p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {type === 'login' ? 'Welcome Back' : 'Create Your Account'}
        </h2>
        <p className="text-muted-foreground mt-2">
          {type === 'login' 
            ? 'Sign in to continue your mentorship journey' 
            : 'Join our community and start your mentorship journey'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'signup' && (
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full pl-10 py-2 border border-input rounded-md bg-background"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full pl-10 py-2 border border-input rounded-md bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2 border border-input rounded-md bg-background"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Role selector - show for both login and signup */}
        <div className="space-y-2">
          <label className="text-sm font-medium">I am a</label>
          <div className="grid grid-cols-2 gap-4">
            <label className={`flex items-center justify-center gap-2 p-3 rounded-md border cursor-pointer transition-colors
              ${formData.role === 'mentee' 
                ? 'bg-mentee text-white border-mentee' 
                : 'bg-background border-input hover:bg-secondary/50'}`}>
              <input
                type="radio"
                name="role"
                value="mentee"
                checked={formData.role === 'mentee'}
                onChange={handleChange}
                className="sr-only"
              />
              <User className="h-4 w-4" />
              <span>Mentee</span>
            </label>
            <label className={`flex items-center justify-center gap-2 p-3 rounded-md border cursor-pointer transition-colors
              ${formData.role === 'mentor' 
                ? 'bg-mentor text-white border-mentor' 
                : 'bg-background border-input hover:bg-secondary/50'}`}>
              <input
                type="radio"
                name="role"
                value="mentor"
                checked={formData.role === 'mentor'}
                onChange={handleChange}
                className="sr-only"
              />
              <Briefcase className="h-4 w-4" />
              <span>Mentor</span>
            </label>
          </div>
        </div>

        {type === 'login' && (
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
        )}

        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-md transition-colors
            ${formData.role === 'mentor' ? 'bg-mentor text-white' : 'bg-mentee text-white'}`}
        >
          {type === 'login' ? (
            <>
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              <span>Create Account</span>
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm mt-6 text-muted-foreground">
        {type === 'login' ? "Don't have an account? " : "Already have an account? "}
        <Link 
          to={type === 'login' ? '/signup' : '/login'} 
          className="text-primary font-medium hover:underline"
        >
          {type === 'login' ? 'Sign up' : 'Sign in'}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
