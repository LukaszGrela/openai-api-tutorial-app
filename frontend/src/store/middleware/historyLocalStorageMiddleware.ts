import { localHistoryStorage } from '../../utils/localHistoryStorage';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { TAppStartListening, TListenerEffect } from './types';
import { clearHistory, removeHistoryEntry, setHistory } from '../slice/history';

type THistorySet = ReturnType<typeof setHistory>;
type THistoryRemove = ReturnType<typeof removeHistoryEntry>;
type THistoryClear = ReturnType<typeof clearHistory>;

const historyLocalStorageEffect: TListenerEffect<
  THistoryRemove | THistoryClear | THistorySet
> = (_, listenerApi) => {
  const state = listenerApi.getState();

  try {
    localHistoryStorage.setObject('historyList', state.history.list);
  } catch (error) {
    console.error(error);
  }
};

const listenerMiddleware = createListenerMiddleware();

const startListening = listenerMiddleware.startListening as TAppStartListening;

const actionMatcher = isAnyOf(setHistory, removeHistoryEntry, clearHistory);

startListening({
  matcher: actionMatcher,
  effect: historyLocalStorageEffect,
});

export default listenerMiddleware.middleware;
