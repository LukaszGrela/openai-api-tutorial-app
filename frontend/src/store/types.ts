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

// Chat/History chat related

export type TResponse = { id: string | number; role: string; content: string };

export type TError = {
  name: string;
  message: string;
  stack?: string | undefined;
};
