import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

/**
 * AuthContext: React Context for managing authentication state.
 * @type {React.Context<any>}
 */
const AuthContext = createContext(null);


/**
 * authReducer: Reducer function to handle authentication state updates.
 * @param {object} state - The current state object.
 * @param {object} action - The action object with a 'type' and optional 'payload'.
 * @returns {object} The new state object.
 */
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            if (!action.payload || typeof action.payload.token !== 'string') {
                console.error('LOGIN action requires a token in the payload.');
                return state;
            }
             return { ...state, token: action.payload.token };
        case 'LOGOUT':
              return { ...state, token: null };
        default:
            return state;
    }
};

/**
 * AuthProvider: React Context Provider component for authentication.
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {JSX.Element} The provider component wrapping its children.
 */
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { token: null });


    if (state === undefined) {
      console.error('The state object is undefined in AuthProvider component.');
      return null;
    }

    const contextValue = {
        state,
        dispatch,
    };


    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};


/**
 * useAuthContext: Custom hook for accessing the authentication context.
 * @returns {any} The value of the authentication context.
 */
const useAuthContext = () => {
    const context = useContext(AuthContext);
      if (!context) {
         throw new Error('useAuthContext must be used within an AuthProvider');
      }
    return context;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider, useAuthContext };