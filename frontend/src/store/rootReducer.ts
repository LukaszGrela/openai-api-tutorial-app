import { combineReducers } from 'redux';
import { historySlice } from './slice/history';

const rootReducer = combineReducers({
  history: historySlice,
});

export default rootReducer;
