import { combineReducers } from 'redux';
import authReducer from './authReducer';
// Import other reducers if any

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default rootReducer;
