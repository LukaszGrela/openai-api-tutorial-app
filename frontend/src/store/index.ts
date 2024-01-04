import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import {
  setChatHistoryMiddleware,
  updateChatLimitsMiddleware,
  storeHistoryMiddleware,
  historyLocalStorageMiddleware,
} from './middleware';

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      updateChatLimitsMiddleware,
      setChatHistoryMiddleware,
      storeHistoryMiddleware,
      historyLocalStorageMiddleware
    ),
});

export default store;
