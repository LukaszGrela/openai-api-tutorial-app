import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  initChatAction,
  restartChatAction,
  sendPromptAction,
  sendSystemPromptAction,
} from '../slice/chat/actions';
import { setChatLimits, setChatUsage } from '../slice/chat-limits';
import type { TAppStartListening, TListenerEffect } from './types';

type TInitChatFulfilled = ReturnType<typeof initChatAction.fulfilled>;
type TRestartChatFulfilled = ReturnType<typeof restartChatAction.fulfilled>;
type TSendPromptFulfilled = ReturnType<typeof sendPromptAction.fulfilled>;
type TSendSystemPromptFulfilled = ReturnType<
  typeof sendSystemPromptAction.fulfilled
>;
const updateChatLimitsEffect: TListenerEffect<
  | TInitChatFulfilled
  | TRestartChatFulfilled
  | TSendPromptFulfilled
  | TSendSystemPromptFulfilled
> = (action, listenerApi) => {
  const { payload } = action;
  listenerApi.dispatch(setChatLimits(payload.rateLimit));
  if (payload.usage) {
    listenerApi.dispatch(setChatUsage(payload.usage));
  }
};

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

const startListening = listenerMiddleware.startListening as TAppStartListening;

const isChatAction = isAnyOf(
  initChatAction.fulfilled,
  restartChatAction.fulfilled,
  sendPromptAction.fulfilled,
  sendSystemPromptAction.fulfilled
);

startListening({
  matcher: isChatAction,
  effect: updateChatLimitsEffect,
});

export default listenerMiddleware.middleware;
