import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Create Auth Context
const AuthContext = createContext();

// Auth Action Types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_PROFILE: 'UPDATE_PROFILE'
};

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
        loading: false
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case AUTH_ACTIONS.UPDATE_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    default:
      return state;
  }
};

// Initial State
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null
};

// API Base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Configure axios defaults
axios.defaults.baseURL = API_URL;

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set up axios interceptor for token
  useEffect(() => {
    const token = localStorage.getItem('livsoul_token');
    const user = localStorage.getItem('livsoul_user');

    if (token && user) {
      try {
        const userData = JSON.parse(user);
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user: userData, token }
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('livsoul_token');
        localStorage.removeItem('livsoul_user');
      }
    }
  }, []);

  // Update axios headers when token changes
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
      localStorage.setItem('livsoul_token', state.token);
      localStorage.setItem('livsoul_user', JSON.stringify(state.user));
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('livsoul_token');
      localStorage.removeItem('livsoul_user');
    }
  }, [state.token, state.user]);

  // Login Function
  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });

      const response = await axios.post('/auth/login', {
        email: email.toLowerCase().trim(),
        password
      });

      if (response.data.success) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: response.data.data
        });
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.error || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Login failed';
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Register Function
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.REGISTER_START });

      const response = await axios.post('/auth/register', {
        ...userData,
        email: userData.email.toLowerCase().trim(),
        name: userData.name.trim()
      });

      if (response.data.success) {
        dispatch({
          type: AUTH_ACTIONS.REGISTER_SUCCESS,
          payload: response.data.data
        });
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.error || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.details?.join(', ') || 
                          error.message || 
                          'Registration failed';
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      // Call logout endpoint if authenticated
      if (state.isAuthenticated) {
        await axios.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  // Update Profile Function
  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/auth/profile', profileData);
      
      if (response.data.success) {
        dispatch({
          type: AUTH_ACTIONS.UPDATE_PROFILE,
          payload: response.data.data.user
        });
        return { success: true, data: response.data.data.user };
      } else {
        throw new Error(response.data.error || 'Profile update failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Profile update failed';
      return { success: false, error: errorMessage };
    }
  };

  // Clear Error Function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return state.user?.role === role;
  };

  // Check if user is doctor
  const isDoctor = () => hasRole('doctor');

  // Check if user is patient
  const isPatient = () => hasRole('patient');

  // Context Value
  const value = {
    // State
    ...state,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    clearError,
    
    // Utilities
    hasRole,
    isDoctor,
    isPatient
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;