import { FC, useLayoutEffect } from 'react';
import { Markdown } from '../Markdown';
import { IProps } from './types';
import { useAppSelector } from '../../store/slice/hooks';

import './ChatOutput.css';

const ChatOutput: FC<IProps> = ({ autoScroll }) => {
  const responses = useAppSelector(({ chat }) => chat.list);

  const className = 'chat-output';
  useLayoutEffect(() => {
    if (autoScroll && responses.length) {
      const output = document.querySelector<HTMLElement>(
        className
          .split(' ')
          .map((s) => `.${s}`)
          .join('')
      );
      output?.scrollTo({
        left: 0,

        behavior: 'smooth',
        top: output.scrollHeight,
      });
    }
  }, [autoScroll, responses]);
  return (
    <output className={className}>
      <ul>
        {responses.map(({ role, content, id, finishReason }) => (
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

export default ChatOutput;
