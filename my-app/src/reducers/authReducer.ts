import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  UPDATE_AUTHENTICATION_STATUS,
} from '../constants/loginConstant';
import { UserAction } from '../actions/loginActions';
import { User } from '../types';

interface UserState {
  loading: boolean;
  error: string | null;
  success: boolean;
  token: string | null;
  userData: User | null;
  id: string | null; // Store the user's name
  firstName: string | null; // Store the user's first name
  lastName: string | null; // Store the user's last name
  email: string | null; // Store the user's email
  avatar: string | null; // Store the user's avatar
  isAuthenticated: boolean; // New property to track authentication status
}

const initialState: UserState = {
  loading: false,
  error: null,
  success: false,
  token: null,
  userData: null,
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  avatar: null,
  isAuthenticated: false, // Initialize with false
};

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        token: action.payload.token,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        avatar: action.payload.avatar,
        isAuthenticated: true, // Set isAuthenticated to true upon successful login
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
        token: null,
        firstName: null,
        lastName: null,
        email: null,
        avatar: null,
        isAuthenticated: false, // Set isAuthenticated to false upon login failure
      };
    case USER_LOGOUT:
      return { ...state, token: null, success: false, isAuthenticated: false }; // Set isAuthenticated to false upon logout
    case UPDATE_AUTHENTICATION_STATUS:
      return { ...state, isAuthenticated: action.isAuthenticated }; // Update isAuthenticated based on the action payload
    default:
      return state;
  }
};

export default userReducer;
