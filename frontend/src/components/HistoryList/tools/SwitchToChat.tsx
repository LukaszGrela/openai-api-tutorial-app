import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setRoute } from '../../../store/slice/route';
import { viewHistoryEntry } from '../../../store/slice/history';

const SwitchToChat: FC = () => {
  const dispatch = useAppDispatch();
  const disable = useAppSelector((state) => state.history.loading);

  const handleClick = useCallback(() => {
    dispatch(viewHistoryEntry(undefined));
    dispatch(setRoute('chat'));
  }, [dispatch]);

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={disable}
      className='show-chat'
    >
      Show chat
    </button>
  );
};

export default SwitchToChat;
