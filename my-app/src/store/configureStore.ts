import { combineReducers, createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import userReducer from '../reducers/authReducer';
// Root state type
export type RootState = ReturnType<typeof rootReducer>;
// Combine multiple reducers into a root reducer
const rootReducer = combineReducers({
  user: userReducer,
});
// Create the Redux store
const store: Store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;