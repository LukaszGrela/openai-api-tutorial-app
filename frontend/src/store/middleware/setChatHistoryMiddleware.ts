import {
  initChatWithHistory,
  removeHistoryEntry,
  setHistory,
  viewHistoryEntry,
} from '../slice/history';
import { setChatHistory } from '../slice/chat';
import { setRoute } from '../slice/route';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import type { TAppStartListening } from './types';

const listenerMiddleware = createListenerMiddleware();

const startListening = listenerMiddleware.startListening as TAppStartListening;

startListening({
  actionCreator: initChatWithHistory.fulfilled,
  effect: (action, listenerApi) => {
    const previousState = listenerApi.getOriginalState();

    const { date, list } = action.payload;
    const { useSystem = false } = action.meta.arg;

    if (!useSystem) {
      // remove from history if it is not system
      listenerApi.dispatch(removeHistoryEntry(date));
      // set chat history
      listenerApi.dispatch(setChatHistory(list));
    } else {
      // use only system message
      listenerApi.dispatch(
        setChatHistory(list.filter(({ role }) => role === 'system'))
      );
    }

    // clear selection
    listenerApi.dispatch(viewHistoryEntry(undefined));
    // navigate to chat
    listenerApi.dispatch(setRoute('chat'));
    // if current chat contains chat - save it
    if (previousState.chat.list.length > 2) {
      listenerApi.dispatch(
        setHistory({
          date: new Date().getTime(),
          list: previousState.chat.list,
          usage: previousState.chatLimits.usage,
        })
      );
    }
  },
});

export default listenerMiddleware.middleware;
