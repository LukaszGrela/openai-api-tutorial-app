import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeHistoryEntry } from '../../../store/slice/history';
import { IProps } from './types';

const DeleteHistoryItem: FC<IProps> = ({ date }) => {
  const dispatch = useAppDispatch();
  const disable = useAppSelector((state) => state.history.loading);

  const handleClick = useCallback(() => {
    dispatch(removeHistoryEntry(date));
  }, [date, dispatch]);

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={disable}
      className='history-item-tools-button  delete'
    >
      Delete
    </button>
  );
};

export default DeleteHistoryItem;
