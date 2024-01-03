import { ThunkAction } from 'redux-thunk';
import type {
  TRestartActionStart,
  TRestartActionFinish,
  TRestartActionFail,
  TRestartAction,
} from './types';
import type { TAppState, TError } from '../../../types';
import { clearHistory } from '../../../../api/clearHistory';
import type { THistoryResponse } from '../../../../api/types';
import { toError } from '../../../utils';

export const restartChatActionStarted = (): TRestartActionStart => ({
  type: 'chat/RESTART/start',
});

export const restartChatActionFinished = (
  payload: THistoryResponse
): TRestartActionFinish => ({
  type: 'chat/RESTART/finish',
  payload,
});

export const restartChatActionFailed = (
  payload: TError
): TRestartActionFail => ({
  type: 'chat/RESTART/fail',
  payload,
});

type TPromise = Promise<THistoryResponse | TError>;

const restartChatAction =
  (): ThunkAction<TPromise, TAppState, unknown, TRestartAction> =>
  async (dispatch, getState): TPromise => {
    const { chatConfiguration } = getState();

    dispatch(restartChatActionStarted());

    try {
      const data = await clearHistory(chatConfiguration.temperature);
      dispatch(restartChatActionFinished(data));
      return await Promise.resolve(data);
    } catch (error) {
      const payload = toError(error);
      dispatch(restartChatActionFailed(payload));
      return await Promise.reject(payload);
    }
  };

export default restartChatAction;
