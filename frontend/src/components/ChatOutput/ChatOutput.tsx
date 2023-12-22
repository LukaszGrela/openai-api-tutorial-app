import { FC, useLayoutEffect } from 'react';
import { Markdown } from '../Markdown';
import { IProps } from './types';

import './ChatOutput.css';

const ChatOutput: FC<IProps> = ({ responses, autoScroll }) => {
  const className = 'chat-output';
  useLayoutEffect(() => {
    if (autoScroll && responses.length) {
      console.log('AutoScroll', autoScroll);
      console.log('responses', responses.length);
      const output = document.querySelector<HTMLElement>(
        className
          .split(' ')
          .map((s) => `.${s}`)
          .join('')
      );
      console.log('output', output);
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
        {responses.map(({ role, content, id }) => (
          <li className={role} key={id}>
            <Markdown markdown={content} />
          </li>
        ))}
      </ul>
    </output>
  );
};

export default ChatOutput;
