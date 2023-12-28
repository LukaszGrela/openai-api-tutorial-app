import { FC } from 'react';
import { useAppSelector } from '../../store/slice/hooks';
import './ChatError.css';

const ChatError: FC = () => {
  const loading = useAppSelector(
    (state) => state.history.loading || state.chat.loading
  );
  const error = useAppSelector((state) => state.chat.error?.message);

  return loading || !error ? (
    <>{null}</>
  ) : (
    <p className='chat-error'>{error}</p>
  );
};

export default ChatError;
