import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogIn } from 'lucide-react';

interface LoginButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const LoginButton: React.FC<LoginButtonProps> = ({ 
  className = "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
  children 
}) => {
  const { loginWithRedirect } = useAuth();

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: window.location.pathname }
    });
  };

  return (
    <button onClick={handleLogin} className={className}>
      {children || (
        <>
          <LogIn className="w-4 h-4 mr-2 inline" />
          Sign In
        </>
      )}
    </button>
  );
};

export default LoginButton; 