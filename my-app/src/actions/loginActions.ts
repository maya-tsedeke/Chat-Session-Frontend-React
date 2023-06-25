import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/configureStore';
import { findUserByEmail } from '../services/apiService';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  UPDATE_AUTHENTICATION_STATUS, // Add the new action type here
} from '../constants/loginConstant';
// Action types
interface UserLoginRequestAction {
  type: typeof USER_LOGIN_REQUEST;
}

interface UserLoginSuccessAction {
  type: typeof USER_LOGIN_SUCCESS;
  payload: {
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
  };
}

interface UserLoginFailureAction {
  type: typeof USER_LOGIN_FAILURE;
  payload: { error: string };
}

interface UserLogoutAction {
  type: typeof USER_LOGOUT;
}

// Add the new action interface here
interface UpdateAuthenticationStatusAction {
  type: typeof UPDATE_AUTHENTICATION_STATUS;
  isAuthenticated: boolean;
}

export type UserAction =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailureAction
  | UserLogoutAction
  | UpdateAuthenticationStatusAction; // Include the new action type here

export const loginAction = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => async (
  dispatch: Dispatch<UserAction>,
  getState: () => RootState
) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const response = await findUserByEmail(email, password);

    if (response && response.token) {
      const { lastName, firstName, email, avatar, token } = response;
      sessionStorage.setItem('accessToken', token);
      sessionStorage.setItem('firstName', firstName);
      sessionStorage.setItem('lastName', lastName);
      sessionStorage.setItem('avatar', avatar);

      console.log('Name:', lastName, ' ', firstName);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          token: token,
          avatar, // Store the user's avatar
          email, // Store the user's email
          firstName, // Store the user's first name
          lastName, // Store the user's last name
        },
      });

      // Update isAuthenticated status immediately upon successful login
      const isAuthenticated = true;
      dispatch({ type: UPDATE_AUTHENTICATION_STATUS, isAuthenticated });
    } else {
      dispatch({ type: USER_LOGIN_FAILURE, payload: { error: 'Invalid credentials' } });
    }
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAILURE, payload: { error: 'An error occurred' } });
  }
};

export const logoutAction = (): UserLogoutAction => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('firstName');
  sessionStorage.removeItem('lastName');
  sessionStorage.removeItem('avatar');
  return { type: USER_LOGOUT };
};
