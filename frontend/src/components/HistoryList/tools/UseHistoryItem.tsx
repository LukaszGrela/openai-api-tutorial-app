import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { initChatWithHistory } from '../../../store/slice/history/actions';
import { IProps } from './types';

const UseHistoryItem: FC<IProps> = ({ date, useSystem }) => {
  const dispatch = useAppDispatch();
  const disable = useAppSelector((state) => state.history.loading);

  const handleClick = useCallback(async () => {
    await dispatch(initChatWithHistory(date, useSystem));
  }, [date, dispatch, useSystem]);

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={disable}
      className='history-item-tools-button use'
    >
      Use{useSystem && ' System'}
    </button>
  );
};

export default UseHistoryItem;
