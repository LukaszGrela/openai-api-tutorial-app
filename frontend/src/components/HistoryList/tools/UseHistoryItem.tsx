import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/slice/hooks';
import { actionUseHistoryEntry } from '../../../store/slice/history';
import { IProps } from './types';

const UseHistoryItem: FC<IProps> = ({ date }) => {
  const dispatch = useAppDispatch();
  const disable = useAppSelector((state) => state.history.loading);

  const handleClick = useCallback(() => {
    dispatch(actionUseHistoryEntry(date));
  }, [date, dispatch]);

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={disable}
      className='history-item-tools-button use'
    >
      Use
    </button>
  );
};

export default UseHistoryItem;
