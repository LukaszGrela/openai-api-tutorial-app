import { Dispatch, Middleware } from 'redux';
import { TAppState } from '../types';
import {
  TChatSendSystemPromptFinish,
  TRestartActionFinish,
} from '../slice/chat';
import { setHistory } from '../slice/history';

const storeHistoryMiddleware: Middleware<
  unknown,
  TAppState,
  Dispatch<TChatSendSystemPromptFinish | TRestartActionFinish>
> = (storeApi) => (next) => (action) => {
  const reactToAction = action as
    | TChatSendSystemPromptFinish
    | TRestartActionFinish;
  const previousState = storeApi.getState();
  const actionResult = next(action); // do the default

  if (
    (reactToAction.type === 'chat/SEND_SYSTEM_PROMPT/finish' ||
      reactToAction.type === 'chat/RESTART/finish') &&
    previousState.chat.list.length > 2
  ) {
    next(
      setHistory({
        date: new Date(),
        list: previousState.chat.list,
        usage: previousState.chatLimits.usage,
      })
    );
  }

  return actionResult;
};

export default storeHistoryMiddleware;
