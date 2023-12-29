import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './rootReducer';
import {
  setChatHistoryMiddleware,
  storeHistoryMiddleware,
  updateChatLimits,
} from './middleware';

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      storeHistoryMiddleware,
      updateChatLimits,
      setChatHistoryMiddleware
    )
  )
);

export default store;
