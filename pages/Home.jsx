import React, { useState } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import SignupForm from '../components/SignupForm.jsx';
import Button from '../components/Button.jsx';

/**
 * Home component renders the landing page with login and signup options.
 * @returns {JSX.Element} The home page element.
 */
const Home = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col space-y-4 w-full max-w-md p-6">
        {!showSignup && <LoginForm />}
        {!showSignup && (
            <div className="flex justify-between items-center">
            <span id="no-account-label">Don't have an account?</span>
            <Button onClick={() => setShowSignup(true)} id="signup-button">
              Sign Up
            </Button>
          </div>
        )}
        {showSignup && <SignupForm />}
          {showSignup && (
             <Button onClick={() => setShowSignup(false)}>
                Back to Login
            </Button>
          )}
      </div>
    </div>
  );
};

export default Home;