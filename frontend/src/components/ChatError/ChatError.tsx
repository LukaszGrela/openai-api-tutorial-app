import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import InitChat from './tools/InitChat';
import './ChatError.css';

const ChatError: FC = () => {
  const loading = useAppSelector(
    (state) => state.history.loading || state.chat.loading
  );
  const error = useAppSelector((state) => state.chat.error?.message);
  const initiated = useAppSelector((state) => state.chat.initiated);

  return loading || !error ? (
    <>{null}</>
  ) : (
    <p className='chat-error'>
      {error}
      {!initiated && <InitChat />}
    </p>
  );
};

export default ChatError;
