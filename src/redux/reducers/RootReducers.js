import {combineReducers} from 'redux';
import Reducers from './Reducers';
import AuthReducers from './AuthReducers';
import PostsReducers from './PostsReducers';
import UpdateUserReducer from './UpdateUserReducer';
import ChatReducers from './ChatReducers';
import NotificationReducers from './NotificationReducers';

const RootReducers = combineReducers({
  Reducers,
  AuthReducers,
  PostsReducers,
  UpdateUserReducer,
  ChatReducers,
  NotificationReducers,
});

export default RootReducers;
