import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './rootReducer';
import {
  setChatHistoryMiddleware,
  storeHistoryMiddleware,
  updateChatLimits,
  historyLocalStorageMiddleware,
} from './middleware';

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      storeHistoryMiddleware,
      updateChatLimits,
      setChatHistoryMiddleware,
      historyLocalStorageMiddleware
    )
  )
);

export default store;
