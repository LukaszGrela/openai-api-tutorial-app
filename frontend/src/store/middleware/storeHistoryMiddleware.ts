import { setHistory } from '../slice/history';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { TAppStartListening, TListenerEffect } from './types';
import { restartChatAction, sendSystemPromptAction } from '../slice/chat';

type TRestartChatFulfilled = ReturnType<typeof restartChatAction.fulfilled>;
type TSendSystemPromptFulfilled = ReturnType<
  typeof sendSystemPromptAction.fulfilled
>;

const storeHistoryChatEffect: TListenerEffect<
  TRestartChatFulfilled | TSendSystemPromptFulfilled
> = (_, listenerApi) => {
  const previousState = listenerApi.getOriginalState();

  if (previousState.chat.list.length > 2) {
    listenerApi.dispatch(
      setHistory({
        date: new Date().getTime(),
        list: previousState.chat.list,
        usage: previousState.chatLimits.usage,
      })
    );
  }
};

const listenerMiddleware = createListenerMiddleware();

const startListening = listenerMiddleware.startListening as TAppStartListening;

const actionMatcher = isAnyOf(
  restartChatAction.fulfilled,
  sendSystemPromptAction.fulfilled
);

startListening({
  matcher: actionMatcher,
  effect: storeHistoryChatEffect,
});

export default listenerMiddleware.middleware;
