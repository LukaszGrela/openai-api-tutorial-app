import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { viewHistoryEntry } from '../../../store/slice/history';
import { IProps } from './types';

const ViewHistoryItem: FC<IProps> = ({ date }) => {
  const dispatch = useAppDispatch();
  const disable = useAppSelector((state) => state.history.loading);

  const handleClick = useCallback(() => {
    dispatch(viewHistoryEntry(date));
  }, [date, dispatch]);

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={disable}
      className='history-item-tools-button view'
    >
      View
    </button>
  );
};

export default ViewHistoryItem;
