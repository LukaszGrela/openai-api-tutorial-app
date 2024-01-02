import { Dispatch, Middleware } from 'redux';
import { TAppState } from '../types';
import {
  THistoryActionUseFinish,
  removeHistoryEntry,
  setHistory,
  viewHistoryEntry,
} from '../slice/history/actions';
import { setChatHistory } from '../slice/chat';
import { setRoute } from '../slice/route';

const setChatHistoryMiddleware: Middleware<
  unknown,
  TAppState,
  Dispatch<THistoryActionUseFinish>
> = (storeApi) => (next) => (action) => {
  const previousState = storeApi.getState();
  const actionResult = next(action); // do the default
  const reactToAction = action as THistoryActionUseFinish;
  if (reactToAction.type === 'history/USE/finished') {
    const { date, list } = reactToAction.payload;

    // remove from history
    next(removeHistoryEntry(date));
    // set chat history
    next(setChatHistory(list));
    // clear selection
    next(viewHistoryEntry(undefined));
    // navigate to chat
    next(setRoute('chat'));
    // if current chat contains chat - save it
    if (previousState.chat.list.length > 2) {
      next(
        setHistory({
          date: new Date(),
          list: previousState.chat.list,
          usage: previousState.chatLimits.usage,
        })
      );
    }
  }
  return actionResult;
};

export default setChatHistoryMiddleware;
