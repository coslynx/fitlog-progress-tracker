import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import auth from '../services/auth';

/**
 * Custom React hook for managing user authentication state.
 * @returns {object} An object containing user data, loading state, error messages, and authentication functions.
 */
const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        const checkCachedToken = async () => {
            const token = localStorage.getItem('token');
            if(token) {
                 setLoading(true);
                try {
                    const response = await api.getAllGoals();
                    if(response){
                        setUser(response.user);
                        dispatch({ type: 'LOGIN', payload: { token } });
                    }
                } catch (err) {
                     console.error("Error refreshing authentication with cached token", err);
                    setError(err.message || 'An error occurred during auto-login');
                    localStorage.removeItem('token');
                   setUser(null);
                    dispatch({type: 'LOGOUT'});
                } finally {
                    setLoading(false);
                }
            }
        };

        checkCachedToken();
    }, [dispatch]);


    /**
     * Logs in a user with the provided email and password.
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     */
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
             const response = await auth.login(email, password);
            setUser(response.user);
              dispatch({ type: 'LOGIN', payload: { token: response.token } });
         } catch (err) {
            console.error('Login failed:', err);
             setError(err.message || 'Invalid credentials');
         } finally {
            setLoading(false);
        }
    };

    /**
     * Signs up a user with the provided email and password.
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     */
    const signup = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await auth.signup(email, password);
            setUser(response.user);
            dispatch({ type: 'LOGIN', payload: { token: response.token } });
        } catch (err) {
            console.error('Signup failed:', err);
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logs out the current user by removing the token from local storage and setting the user state to null.
     */
    const logout = () => {
        auth.logout();
        setUser(null);
         setError(null);
        dispatch({ type: 'LOGOUT' });
    };

    /**
     * Checks if a user is currently authenticated by verifying the presence of a token in local storage.
     * @returns {boolean} True if a token is present, false otherwise.
     */
    const isAuthenticated = () => {
       return !!localStorage.getItem('token');
    };

    return {
        user,
        loading,
        error,
        login,
        signup,
        logout,
        isAuthenticated,
    };
};

export default useAuth;