import { ThunkAction } from 'redux-thunk';
import type {
  THistoryActionUse,
  THistoryActionUseFail,
  THistoryActionUseFinish,
  THistoryActionUseStart,
} from './types';
import type { TAppState, TError } from '../../../types';
import type { THistoryItem } from '../types';
import { toError } from '../../../utils';
import { setHistory } from '../../../../api/setHistory';

type TPromise = Promise<THistoryItem | TError>;

export const initChatWithHistoryStarted = (
  payload: Date
): THistoryActionUseStart => ({
  type: 'history/USE/started',
  payload,
});
export const initChatWithHistoryFailed = (
  payload: TError
): THistoryActionUseFail => ({
  type: 'history/USE/failed',
  payload,
});
export const initChatWithHistoryFinished = (
  payload: THistoryItem
): THistoryActionUseFinish => ({
  type: 'history/USE/finished',
  payload,
});

const initChatWithHistory =
  (date: Date): ThunkAction<TPromise, TAppState, unknown, THistoryActionUse> =>
  async (dispatch, getState): TPromise => {
    const { history } = getState();

    dispatch(initChatWithHistoryStarted(date));

    try {
      let data = history.list.find(
        (item) => item.date.getTime() === date.getTime()
      );
      if (
        !data &&
        history.current &&
        history.current.date.getTime() === date.getTime()
      ) {
        // check current
        data = history.current;
      }

      if (data) {
        // send
        await setHistory(data.list);
        // all good
        dispatch(initChatWithHistoryFinished(data));
        return data;
      }

      throw new Error('History entry not found');
    } catch (error) {
      const payload = toError(error);
      dispatch(initChatWithHistoryFailed(payload));
      return payload;
    }
  };

export default initChatWithHistory;