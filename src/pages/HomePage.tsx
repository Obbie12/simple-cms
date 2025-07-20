import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-medium text-gray-900 mb-8">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back, {user?.username}</p>

      <button
        onClick={handleLogout}
        className="mb-8 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-900 mb-1">Analytics</h3>
          <p className="text-base text-gray-700">View statistics</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-900 mb-1">Content</h3>
          <p className="text-base text-gray-700">Manage content</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-900 mb-1">Settings </h3>
          <p className="text-base text-gray-700">Configure system</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
