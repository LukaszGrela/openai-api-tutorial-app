import { ThunkAction } from 'redux-thunk';
import type { TError, TAppState } from '../../../types';
import type {
  TChatSendPromptStart,
  TChatSendPromptFinish,
  TChatSendPromptFail,
  TChatSendPrompt,
} from './types';
import { sendPrompt } from '../../../../api/sendPrompt';
import type { TPromptResponse } from '../../../../api/types';

export const sendPromptActionStarted = (
  payload: string
): TChatSendPromptStart => ({
  type: 'chat/SEND_PROMPT/start',
  payload,
});

export const sendPromptActionFinished = (
  payload: TPromptResponse
): TChatSendPromptFinish => ({
  type: 'chat/SEND_PROMPT/finish',
  payload,
});

export const sendPromptActionFailed = (
  payload: TError
): TChatSendPromptFail => ({
  type: 'chat/SEND_PROMPT/fail',
  payload,
});

type TPromise = Promise<TPromptResponse | TError>;

const sendPromptAction =
  (
    prompt: string
  ): ThunkAction<TPromise, TAppState, unknown, TChatSendPrompt> =>
  async (dispatch): TPromise => {
    dispatch(sendPromptActionStarted(prompt));

    try {
      const data = await sendPrompt(prompt);
      dispatch(sendPromptActionFinished(data));
      return await Promise.resolve(data);
    } catch (error) {
      const payload = {
        name: (error as Error).name,
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
      dispatch(sendPromptActionFailed(payload));
      return await Promise.reject(payload);
    }
  };

export default sendPromptAction;
