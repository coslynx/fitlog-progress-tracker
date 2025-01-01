import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Profile component renders the user profile page.
 * @returns {JSX.Element} The profile page element.
 */
const Profile = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();


    // Redirect unauthenticated users to the home page
    useEffect(() => {
        try{
          if (!isAuthenticated) {
              navigate('/');
          }
        } catch(error) {
           console.error('Error getting authentication state:', error);
           navigate('/');
        }

    }, [isAuthenticated, navigate]);


    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4">
                <h2 className="text-3xl font-bold text-center mb-4">User Profile</h2>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <span className="text-gray-700 font-medium mr-2">User ID:</span>
                        <span className="text-gray-900" id="user-id-display">user-123</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-700 font-medium mr-2">Email:</span>
                        <span className="text-gray-900" id="user-email-display">test@example.com</span>
                   </div>
                </div>
                  <div className="text-center">
                    <p>Profile editing form will be implemented here</p>
                  </div>
                <div className="text-center mt-4">
                    <Link
                        to="/dashboard"
                        className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="back-to-dashboard-link"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;