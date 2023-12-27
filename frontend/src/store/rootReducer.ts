import { combineReducers } from 'redux';
import { historySlice } from './slice/history';
import { chatSlice } from './slice/chat';
import { chatConfigurationSlice } from './slice/chat-configuration';

const rootReducer = combineReducers({
  chat: chatSlice,
  chatConfiguration: chatConfigurationSlice,
  history: historySlice,
});

export default rootReducer;
