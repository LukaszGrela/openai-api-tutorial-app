import { FC } from 'react';
import { Markdown } from '../Markdown';
import { useAppSelector } from '../../store/slice/hooks';

import './HistoryOutput.css';

const HistoryOutput: FC = () => {
  const responses = useAppSelector(({ history }) => history.current?.list);

  const className = 'history-output';

  return (
    <output className={className}>
      <ul>
        {responses?.map(({ role, content, id, finishReason }) => (
          <li className={role} key={id}>
            <Markdown markdown={content} />
            {finishReason === 'content_filter' && (
              <Markdown markdown='**Warning** answer was filtered by Open API' />
            )}
            {finishReason === 'length' && (
              <Markdown markdown='**Warning** maximum number of tokens specified in the request was reached, please **Restart** the chat.' />
            )}
          </li>
        ))}
      </ul>
    </output>
  );
};

export default HistoryOutput;
