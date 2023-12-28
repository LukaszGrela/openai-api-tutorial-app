import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/slice/hooks';
import { setRoute } from '../../../store/slice/route';

const SwitchToChat: FC = () => {
  const dispatch = useAppDispatch();
  const disable = useAppSelector((state) => state.history.loading);

  const handleClick = useCallback(() => {
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
