import { combineReducers } from 'redux';
import { historySlice } from './slice/history';
import { chatSlice } from './slice/chat';

const rootReducer = combineReducers({
  chat: chatSlice,
  history: historySlice,
});

export default rootReducer;
