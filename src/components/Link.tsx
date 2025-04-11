
import { Link as RouterLink, LinkProps } from 'react-router-dom';

interface ExtendedLinkProps extends LinkProps {
  className?: string;
  state?: Record<string, any>;
}

const Link = ({ children, className, state, ...props }: ExtendedLinkProps) => {
  // Use RouterLink for navigation to ensure proper client-side routing
  return (
    <RouterLink 
      className={className || ''} 
      state={state}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
