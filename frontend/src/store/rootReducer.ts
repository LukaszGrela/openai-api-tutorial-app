import { combineReducers } from 'redux';
import { historySlice } from './slice/history';
import { chatSlice } from './slice/chat';
import { chatConfigurationSlice } from './slice/chat-configuration';
import { chatLimitsSlice } from './slice/chat-limits';

const rootReducer = combineReducers({
  chat: chatSlice,
  chatConfiguration: chatConfigurationSlice,
  chatLimits: chatLimitsSlice,
  history: historySlice,
});

export default rootReducer;
