import { FC } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import './rehypeHighlight.css';

const Markdown: FC<
  Omit<Options, 'remarkPlugins' | 'rehypePlugins'> & { markdown: string }
> = ({ markdown, ...options }): JSX.Element => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      {...options}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;
