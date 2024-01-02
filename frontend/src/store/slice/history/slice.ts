import { localHistoryStorage } from '../../../utils/localHistoryStorage';
import type {
  THistoryActionView,
  THistoryActionClear,
  THistoryActionRemove,
  THistoryActionSet,
  THistoryActionUse,
} from './actions/types';
import type { IHistoryState, THistoryItem } from './types';

const initialState: IHistoryState = {
  current: undefined,
  list: [],
  loading: false,
};

// load from localstorage
try {
  const list = localHistoryStorage.getObject<THistoryItem[]>('historyList');
  initialState.list =
    list?.map((localData) => ({
      ...localData,
      date: new Date(localData.date),
    })) || [];
} catch (error) {
  console.error(error);
}

const slice = (
  state = initialState,
  action:
    | THistoryActionView
    | THistoryActionClear
    | THistoryActionRemove
    | THistoryActionSet
    | THistoryActionUse
): IHistoryState => {
  switch (action.type) {
    case 'history/SET':
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case 'history/VIEW': {
      const matched = state.list.find(
        (item) => item.date.getTime() === action.payload?.getTime()
      );
      return {
        ...state,
        current: matched,
      };
    }
    case 'history/REMOVE': {
      return {
        ...state,
        list: state.list.filter(
          (item) => item.date.getTime() !== action.payload?.getTime()
        ),
      };
    }
    default:
      break;
  }
  return state;
};

export default slice;
