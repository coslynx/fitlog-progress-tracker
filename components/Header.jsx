import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

/**
 * Header component renders the application's header with navigation links.
 * @returns {JSX.Element} The header element.
 */
const Header = () => {
    const { isAuthenticated } = useAuth();
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Fitness Tracker</div>
      {isAuthenticated && (
            <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link
                      to="/dashboard"
                      className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/goals"
                      className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Goals
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
            </nav>
      )}
    </header>
  );
};

export default Header;