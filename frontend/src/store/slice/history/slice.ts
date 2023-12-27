import {
  IHistoryState,
  THistoryActionAdd,
  THistoryActionClear,
  THistoryActionRemove,
  THistoryActionSet,
} from './types';

const initialState: IHistoryState = {
  current: {
    date: new Date(),
    list: [],
  },
  list: [],
  loading: false,
};

const slice = (
  state = initialState,
  action:
    | THistoryActionAdd
    | THistoryActionClear
    | THistoryActionRemove
    | THistoryActionSet
): IHistoryState => {
  switch (action.type) {
    case 'history/SET':
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    default:
      break;
  }
  return state;
};

export default slice;
