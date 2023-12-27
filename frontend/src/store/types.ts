import { ThunkDispatch } from 'redux-thunk';
import rootReducer from './rootReducer';
import { Action, Store } from 'redux';

export type TAppState = ReturnType<typeof rootReducer>;

export type TDispatch = ThunkDispatch<TAppState, unknown, Action>;

export type TStore = Store<TAppState, Action> & { dispatch: TDispatch };

export type TError = {
  name: string;
  message: string;
  stack?: string | undefined;
};
