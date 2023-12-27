import { useAppSelector } from '../../store/slice/hooks';

import './ChatLimits.css';

const ChatLimits: React.FC = () => {
  const limits = useAppSelector(({ chatLimits }) => chatLimits);

  return (
    <div className='chat-limits'>
      <span>
        <span className='label'>Requests:</span> {limits.requestsRemaining}/
        {limits.requestsLimit}
      </span>
      <span>
        <span className='label'>Tokens:</span> {limits.tokensRemaining}/
        {limits.tokensLimit}
      </span>
      <span>
        <span className='label'>Usage-based Tokens:</span>{' '}
        {limits.tokensUsageBasedRemaining}/{limits.tokensUsageBasedLimit}
      </span>
    </div>
  );
};

export default ChatLimits;
