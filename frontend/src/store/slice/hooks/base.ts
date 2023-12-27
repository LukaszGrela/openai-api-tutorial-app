import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { TStore } from '../../types';

type TAppDispatch = TStore['dispatch'];
export const useAppDispatch: () => TAppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<TStore['getState']>
> = useSelector;
