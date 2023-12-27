import {
  IHistoryState,
  THistoryActionAdd,
  THistoryActionClear,
  THistoryActionInitFail,
  THistoryActionInitFinish,
  THistoryActionInitStart,
  THistoryActionRemove,
  THistoryActionSet,
} from './types';

const initialState: IHistoryState = {
  current: 0,
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
    | THistoryActionInitStart
    | THistoryActionInitFinish
    | THistoryActionInitFail
): IHistoryState => {
  switch (action.type) {
    case 'history/INIT/start':
      return {
        ...state,
        loading: true,
      };
    case 'history/INIT/finish':
      return {
        current: 0,
        list: [
          {
            date: new Date(),
            list: action.payload.list,
          },
        ],
        loading: false,
      };
    case 'history/INIT/fail':
      return {
        ...state,
        loading: false,
      };

    default:
      break;
  }
  return state;
};

export default slice;
