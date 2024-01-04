import { ListenerEffect, TypedStartListening, Action } from '@reduxjs/toolkit';
import type { TAppState, TDispatch } from '../types';

export type TAppStartListening = TypedStartListening<TAppState, TDispatch>;

export type TListenerEffect<A extends Action> = ListenerEffect<
  A,
  TAppState,
  TDispatch
>;
