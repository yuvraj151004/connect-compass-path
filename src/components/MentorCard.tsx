
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MessageSquare } from 'lucide-react';

interface MentorCardProps {
  id: string;
  name: string;
  title: string;
  company?: string;
  avatar?: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({ 
  id, 
  name, 
  title, 
  company, 
  avatar, 
  skills, 
  rating, 
  reviewCount,
  featured = false
}) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/mentors/${id}`);
  };
  
  const handleScheduleSession = () => {
    navigate('/dashboard/new-session', {
      state: {
        mentorId: id,
        mentorName: name,
        userRole: 'mentee'
      }
    });
  };
  
  const handleSendMessage = () => {
    navigate('/dashboard/messages', {
      state: {
        messageId: id,
        userRole: 'mentee'
      }
    });
  };
  
  return (
    <div className={`bg-card rounded-lg shadow-sm overflow-hidden card-hover
      ${featured ? 'border-2 border-primary/20 shadow-md' : 'border border-border'}`}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-secondary flex-shrink-0 overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
                {name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-sm text-muted-foreground">
                  {title}{company ? ` at ${company}` : ''}
                </p>
              </div>
              {featured && (
                <span className="badge bg-primary/10 text-primary">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-muted-foreground">
                  {rating.toFixed(1)} ({reviewCount})
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.slice(0, 4).map((skill, index) => (
              <span key={index} className="badge bg-secondary text-secondary-foreground">
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="badge bg-secondary text-secondary-foreground">
                +{skills.length - 4} more
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleViewProfile}
              className="btn-outline flex-1 flex items-center justify-center gap-1 text-sm py-1.5"
            >
              View Profile
            </button>
            <button 
              onClick={handleScheduleSession}
              className="btn-primary flex-1 flex items-center justify-center gap-1 text-sm py-1.5"
            >
              <Calendar className="h-4 w-4" />
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
