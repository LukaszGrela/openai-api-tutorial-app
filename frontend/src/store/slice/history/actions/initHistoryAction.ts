import type { ThunkAction } from 'redux-thunk';
import type {
  THistoryActionInitFail,
  THistoryActionInitFinish,
  THistoryActionInitStart,
  THistoryResponse,
} from '../types';
import type { TAppState } from '../../../types';
import { getHistory } from '../../../../api/getHistory';

export const initHistoryActionStarted = (): THistoryActionInitStart => ({
  type: 'history/INIT/start',
});

export const initHistoryActionFinished = (
  payload: THistoryResponse
): THistoryActionInitFinish => ({
  type: 'history/INIT/finish',
  payload,
});

type TError = {
  name: string;
  message: string;
  stack?: string | undefined;
};
export const initHistoryActionFailed = (
  payload: TError
): THistoryActionInitFail => ({
  type: 'history/INIT/fail',
  payload,
});

type TPromise = Promise<THistoryResponse | TError>;
type TAction =
  | THistoryActionInitStart
  | THistoryActionInitFinish
  | THistoryActionInitFail;

const initHistoryAction =
  (): ThunkAction<TPromise, TAppState, unknown, TAction> =>
  async (dispatch): TPromise => {
    dispatch(initHistoryActionStarted());

    try {
      const data = await getHistory();
      dispatch(initHistoryActionFinished(data));
      return await Promise.resolve(data);
    } catch (error) {
      const payload = {
        name: (error as Error).name,
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
      dispatch(initHistoryActionFailed(payload));
      return await Promise.reject(payload);
    }
  };

export default initHistoryAction;
