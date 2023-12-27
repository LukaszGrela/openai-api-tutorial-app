import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/slice/hooks';
import { restartChatAction } from '../../../store/slice/chat';

const RestartChat: FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(
    (state) =>
      state.history.loading || state.chat.loading || state.chat.list.length <= 2
  );

  const handleReset = useCallback(() => {
    dispatch(restartChatAction());
  }, [dispatch]);

  return (
    <button
      type='button'
      onClick={handleReset}
      disabled={loading}
      className='restart-chat'
    >
      Restart
    </button>
  );
};

export default RestartChat;
