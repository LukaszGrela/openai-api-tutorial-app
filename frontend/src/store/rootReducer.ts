import { combineReducers } from 'redux';
import history from './slice/history';
import chat from './slice/chat';
import chatConfiguration from './slice/chat-configuration';
import chatLimits from './slice/chat-limits';
import route from './slice/route';

const rootReducer = combineReducers({
  chat,
  chatConfiguration,
  chatLimits,
  history,
  route,
});

export default rootReducer;
