import { ThunkAction } from 'redux-thunk';
import type {
  TInitChatAction,
  TInitChatActionFail,
  TInitChatActionFinish,
  TInitChatActionStart,
} from './types';
import type { TAppState, TError } from '../../../types';
import { getHistory } from '../../../../api/getHistory';
import type { THistoryResponse } from '../../../../api/types';
import { toError } from '../../../utils';

export const initChatActionStarted = (): TInitChatActionStart => ({
  type: 'chat/INIT/start',
});

export const initChatActionFinished = (
  payload: THistoryResponse
): TInitChatActionFinish => ({
  type: 'chat/INIT/finish',
  payload,
});

export const initChatActionFailed = (payload: TError): TInitChatActionFail => ({
  type: 'chat/INIT/fail',
  payload,
});

type TPromise = Promise<THistoryResponse | TError>;

const initChatAction =
  (): ThunkAction<TPromise, TAppState, unknown, TInitChatAction> =>
  async (dispatch, getState): TPromise => {
    const { chat } = getState();

    if (chat.initiated) {
      // already initiated
      return await Promise.resolve({
        list: chat.list,
        rateLimit: {
          // TODO: rateLimit from state
          requestsLimit: 0,
          requestsRemaining: 0,
          tokensLimit: 0,
          tokensRemaining: 0,
          tokensUsageBasedLimit: 0,
          tokensUsageBasedRemaining: 0,
        },
      });
    }

    dispatch(initChatActionStarted());

    try {
      const data = await getHistory();
      dispatch(initChatActionFinished(data));
      return data;
    } catch (error) {
      const payload = toError(error);
      dispatch(initChatActionFailed(payload));
      return payload;
    }
  };

export default initChatAction;
