import { FC, FormEvent, useCallback, useState } from 'react';
import { ChatTemperature } from '../ChatConfiguration';
import { IProps } from './types';

import './ChatForm.css';

const ChatForm: FC<IProps> = ({
  onSubmit,
  disable,
  onReset,
  onSetSystem,
}): JSX.Element => {
  const [prompt, setPrompt] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((e) => {
      const value = e.target.value;

      setPrompt(value);
    }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setPrompt(''); // reset on submit
      onSubmit({ prompt });
    },
    [onSubmit, prompt]
  );

  const handleReset = useCallback(() => {
    setPrompt('');

    onReset?.();
  }, [onReset]);

  const handleSetSystem = useCallback(() => {
    setPrompt(''); // reset on submit

    onSetSystem({
      prompt,
    });
  }, [onSetSystem, prompt]);

  return (
    <div className='chat-form'>
      <form id='form' onSubmit={handleSubmit}>
        <div className='chat-form-input'>
          <textarea
            id='prompt'
            autoFocus
            value={prompt}
            onChange={handleChange}
            disabled={disable}
          ></textarea>
          <ChatTemperature />
        </div>
        <span className='chat-form-buttons'>
          <button type='submit' disabled={disable || !prompt}>
            Send
          </button>
          <button
            type='button'
            onClick={handleSetSystem}
            disabled={disable || !prompt}
          >
            Set System
          </button>
        </span>
      </form>
      <div className='tools'>
        <button type='button' onClick={handleReset} disabled={disable}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default ChatForm;
