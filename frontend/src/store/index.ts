import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { storeHistoryMiddleware, updateChatLimits } from './middleware';

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(
    applyMiddleware(thunk, storeHistoryMiddleware, updateChatLimits)
  )
);

export default store;
