import { ThunkDispatch } from 'redux-thunk';
import rootReducer from './rootReducer';
import { Action, Store } from 'redux';

export type TLimits = {
  requestsLimit: number;
  requestsRemaining: number;
  tokensLimit: number;
  tokensRemaining: number;
  tokensUsageBasedLimit: number;
  tokensUsageBasedRemaining: number;
};

export type TAppState = ReturnType<typeof rootReducer>;

export type TDispatch = ThunkDispatch<TAppState, unknown, Action>;

export type TStore = Store<TAppState, Action> & { dispatch: TDispatch };
