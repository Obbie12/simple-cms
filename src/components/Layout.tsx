import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {isAuthenticated && (
        <nav className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-gray-900 text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/settings" className="text-gray-900 text-sm font-medium">
                  Settings
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 text-sm hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
