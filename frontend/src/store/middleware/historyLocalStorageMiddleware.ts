import { Dispatch, Middleware } from 'redux';
import { TAppState } from '../types';
import {
  THistoryActionRemove,
  THistoryActionSet,
} from '../slice/history/actions';
import { localHistoryStorage } from '../../utils/localHistoryStorage';

const historyLocalStorageMiddleware: Middleware<
  unknown,
  TAppState,
  Dispatch<THistoryActionSet | THistoryActionRemove>
> = (storeApi) => (next) => (action) => {
  const actionResult = next(action); // do the default
  const reactToAction = action as THistoryActionSet | THistoryActionRemove;
  if (
    reactToAction.type === 'history/SET' ||
    reactToAction.type === 'history/REMOVE'
  ) {
    const state = storeApi.getState();

    try {
      localHistoryStorage.setObject('historyList', state.history.list);
    } catch (error) {
      console.error(error);
    }
  }
  return actionResult;
};

export default historyLocalStorageMiddleware;
