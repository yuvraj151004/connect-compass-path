
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
    
    // Simulate successful authentication and route based on role
    if (type === 'login') {
      if (formData.role === 'mentor') {
        // Use the navigate function with the correct state
        navigate('/dashboard', { state: { userRole: 'mentor' } });
      } else {
        navigate('/dashboard', { state: { userRole: 'mentee' } });
      }
    } else {
      // For signup, directly navigate to dashboard with role
      navigate('/dashboard', { state: { userRole: formData.role } });
    }
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

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="btn-outline flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            <span>Google</span>
          </button>
          <button
            type="button"
            className="btn-outline flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </button>
        </div>
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
