import { Action, Dispatch, Middleware } from 'redux';
import { TAppState } from '../types';
import {
  TChatSendSystemPromptFinish,
  TRestartActionFinish,
} from '../slice/chat';
import { setHistory } from '../slice/history';

const storeHistoryMiddleware: Middleware<
  unknown,
  TAppState,
  Dispatch<Action>
> = (storeApi) => (next) => (action) => {
  const reactToAction = action as
    | TChatSendSystemPromptFinish
    | TRestartActionFinish;
  const previousState = storeApi.getState();
  const actionResult = next(action); // do the default

  if (
    reactToAction.type === 'chat/SEND_SYSTEM_PROMPT/finish' ||
    reactToAction.type === 'chat/RESTART/finish'
  ) {
    next(
      setHistory({
        date: new Date(),
        list: previousState.chat.list,
      })
    );
  }

  return actionResult;
};

export default storeHistoryMiddleware;
