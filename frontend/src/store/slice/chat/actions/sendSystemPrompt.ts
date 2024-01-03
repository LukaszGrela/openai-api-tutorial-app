import { ThunkAction } from 'redux-thunk';
import type { THistoryResponse } from '../../../../api/types';
import type { TAppState, TError } from '../../../types';
import type {
  TChatSendSystemPrompt,
  TChatSendSystemPromptFail,
  TChatSendSystemPromptFinish,
  TChatSendSystemPromptStart,
} from './types';
import { clearHistoryAndSetSystem } from '../../../../api/clearHistory';

export const sendSystemPromptActionStarted = (
  payload: string
): TChatSendSystemPromptStart => ({
  type: 'chat/SEND_SYSTEM_PROMPT/start',
  payload,
});

export const sendSystemPromptActionFinished = (
  payload: THistoryResponse
): TChatSendSystemPromptFinish => ({
  type: 'chat/SEND_SYSTEM_PROMPT/finish',
  payload,
});

export const sendSystemPromptActionFailed = (
  payload: TError
): TChatSendSystemPromptFail => ({
  type: 'chat/SEND_SYSTEM_PROMPT/fail',
  payload,
});

type TPromise = Promise<THistoryResponse | TError>;

const sendSystemPromptAction =
  (
    prompt: string
  ): ThunkAction<TPromise, TAppState, unknown, TChatSendSystemPrompt> =>
  async (dispatch): TPromise => {
    const isSilly = false;

    dispatch(sendSystemPromptActionStarted(prompt));

    try {
      const data = await clearHistoryAndSetSystem(prompt, 'system', !isSilly);
      dispatch(sendSystemPromptActionFinished(data));
      return await Promise.resolve(data);
    } catch (error) {
      const payload = {
        name: (error as Error).name,
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
      dispatch(sendSystemPromptActionFailed(payload));
      return await Promise.reject(payload);
    }
  };

export default sendSystemPromptAction;
