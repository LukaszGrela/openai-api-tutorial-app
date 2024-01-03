import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { initChatAction } from '../../../store/slice/chat';

const InitChat: FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(
    (state) =>
      state.history.loading || state.chat.loading || state.chat.initiated
  );

  const handleReset = useCallback(() => {
    dispatch(initChatAction());
  }, [dispatch]);

  return (
    <button
      type='button'
      onClick={handleReset}
      disabled={loading}
      className='restart-chat'
    >
      Reload
    </button>
  );
};

export default InitChat;
