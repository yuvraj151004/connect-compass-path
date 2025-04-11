
import { Link as RouterLink, LinkProps } from 'react-router-dom';

const Link = ({ children, className, ...props }: LinkProps & { className?: string }) => {
  return <RouterLink className={className} {...props}>{children}</RouterLink>;
};

export default Link;
