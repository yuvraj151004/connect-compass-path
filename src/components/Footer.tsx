
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 14C20.3137 14 23 11.3137 23 8C23 4.68629 20.3137 2 17 2C13.6863 2 11 4.68629 11 8C11 9.29583 11.3846 10.4957 12.0577 11.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10C3.68629 10 1 12.6863 1 16C1 19.3137 3.68629 22 7 22C10.3137 22 13 19.3137 13 16C13 14.7042 12.6154 13.5043 11.9423 12.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 16C20 18.2091 18.2091 20 16 20C13.7909 20 12 18.2091 12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold">MentorConnect</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Connecting mentors and mentees for personal and professional growth through structured mentorship.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/mentors" className="text-muted-foreground hover:text-primary transition-colors">Find Mentors</Link></li>
              <li><Link to="/forum" className="text-muted-foreground hover:text-primary transition-colors">Forum</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Mentors</h3>
            <ul className="space-y-2">
              <li><Link to="/signup?role=mentor" className="text-muted-foreground hover:text-primary transition-colors">Become a Mentor</Link></li>
              <li><Link to="/mentor-guide" className="text-muted-foreground hover:text-primary transition-colors">Mentor Guide</Link></li>
              <li><Link to="/mentor-resources" className="text-muted-foreground hover:text-primary transition-colors">Resources</Link></li>
              <li><Link to="/success-stories" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href="mailto:info@mentorconnect.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@mentorconnect.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Subscribe to Newsletter</h4>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-background rounded-md border border-input px-3 py-2 text-sm flex-1"
                />
                <button type="submit" className="btn-primary text-sm">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MentorConnect. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
