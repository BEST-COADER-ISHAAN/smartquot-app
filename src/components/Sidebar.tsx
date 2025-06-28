import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Users, 
  Settings,
  Menu,
  X,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'quotations', label: 'Quotations', icon: FileText, path: '/quotations' },
    { id: 'products', label: 'Products', icon: Package, path: '/products' },
    { id: 'customers', label: 'Customers', icon: Users, path: '/customers' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const toggleSidebar = () => {
    if (onToggle) {
      onToggle();
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Update CSS custom property when sidebar state changes (desktop only)
  useEffect(() => {
    if (!onToggle) { // Only for desktop collapse functionality
      document.documentElement.style.setProperty(
        '--sidebar-width', 
        isCollapsed ? '64px' : '256px'
      );
    }
  }, [isCollapsed, onToggle]);

  // Helper function to check if path is active
  const isActivePath = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  // Handle navigation and close mobile sidebar
  const handleNavigation = () => {
    if (onToggle) {
      onToggle(); // Close mobile sidebar
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`bg-white shadow-lg h-screen fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out ${
        onToggle 
          ? (isOpen ? 'w-64 translate-x-0' : '-translate-x-full w-64') // Mobile behavior
          : (isCollapsed ? 'w-16' : 'w-64') // Desktop behavior
      } flex flex-col lg:translate-x-0`}>
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200 flex items-center justify-between">
          <div className={`transition-opacity duration-300 ${(isCollapsed && !onToggle) ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 whitespace-nowrap">SmartQuot</h1>
            <p className="text-xs lg:text-sm text-gray-500 mt-1 whitespace-nowrap">Quotation Management</p>
          </div>
          
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
            title={onToggle ? 'Close menu' : (isCollapsed ? 'Expand sidebar' : 'Collapse sidebar')}
          >
            {onToggle ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : isCollapsed ? (
              <Menu className="w-5 h-5 text-gray-600" />
            ) : (
              <X className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="mt-4 lg:mt-6 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleNavigation}
                className={`w-full flex items-center px-4 lg:px-6 py-3 text-left transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-3 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
                title={(isCollapsed && !onToggle) ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className={`font-medium ml-3 transition-all duration-300 ${
                  (isCollapsed && !onToggle) ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                }`}>
                  {item.label}
                </span>
                
                {/* Tooltip for collapsed state (desktop only) */}
                {(isCollapsed && !onToggle) && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Profile Option at Bottom */}
        <div className="mt-auto mb-4 px-4 lg:px-6 flex flex-col gap-2">
          <Link
            to="/profile"
            onClick={handleNavigation}
            className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 group rounded-lg ${
              'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`}
            title={(isCollapsed && !onToggle) ? 'Profile' : ''}
          >
            <User className="w-5 h-5 flex-shrink-0" />
            <span className={`font-medium ml-3 transition-all duration-300 ${
              (isCollapsed && !onToggle) ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            }`}>
              Profile
            </span>
            {/* Tooltip for collapsed state (desktop only) */}
            {(isCollapsed && !onToggle) && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Profile
              </div>
            )}
          </Link>
          <button
            onClick={async () => {
              await signOut();
              handleNavigation();
            }}
            className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 group rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800`}
            title={(isCollapsed && !onToggle) ? 'Sign Out' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={`font-medium ml-3 transition-all duration-300 ${
              (isCollapsed && !onToggle) ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            }`}>
              Sign Out
            </span>
            {(isCollapsed && !onToggle) && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Sign Out
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;