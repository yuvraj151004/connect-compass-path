
import { Link as RouterLink, LinkProps } from 'react-router-dom';

const Link = ({ children, className, ...props }: LinkProps & { className?: string }) => {
  // Use RouterLink for navigation to ensure proper client-side routing
  return <RouterLink className={className || ''} {...props}>{children}</RouterLink>;
};

export default Link;
