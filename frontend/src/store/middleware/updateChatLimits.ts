import { Dispatch, Middleware } from 'redux';
import type { TAppState } from '../types';
import type {
  TChatSendPromptFinish,
  TChatSendSystemPromptFinish,
  TInitChatActionFinish,
  TRestartActionFinish,
} from '../slice/chat';
import { setChatLimits, setChatUsage } from '../slice/chat-limits';

const updateChatLimits: Middleware<
  unknown,
  TAppState,
  Dispatch<
    | TRestartActionFinish
    | TChatSendPromptFinish
    | TChatSendSystemPromptFinish
    | TInitChatActionFinish
  >
> = () => (next) => (action) => {
  const reactToAction = action as
    | TRestartActionFinish
    | TChatSendPromptFinish
    | TChatSendSystemPromptFinish
    | TInitChatActionFinish;

  const actionResult = next(action); // do the default
  if (
    reactToAction.type === 'chat/INIT/finish' ||
    reactToAction.type === 'chat/RESTART/finish' ||
    reactToAction.type === 'chat/SEND_PROMPT/finish' ||
    reactToAction.type === 'chat/SEND_SYSTEM_PROMPT/finish'
  ) {
    const { payload } = reactToAction;
    next(setChatLimits(payload.rateLimit));
    if (payload.usage) {
      next(setChatUsage(payload.usage));
    }
  }

  return actionResult;
};

export default updateChatLimits;
