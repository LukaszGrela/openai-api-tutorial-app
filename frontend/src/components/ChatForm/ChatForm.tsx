import { FC, FormEvent, useCallback, useState } from 'react';
import { IProps } from './types';

import './ChatForm.css';

const ChatForm: FC<IProps> = ({
  onSubmit,
  disable,
  onReset,
  onSetSystem,
}): JSX.Element => {
  const [prompt, setPrompt] = useState('');
  const [cold, setCold] = useState(true);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((e) => {
      const value = e.target.value;

      setPrompt(value);
    }, []);

  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      console.log(e.target.checked);
      const value = e.target.checked;

      setCold(value);
    }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setPrompt(''); // reset on submit
      onSubmit({ prompt, isSilly: !cold });
    },
    [onSubmit, prompt, cold]
  );

  const handleReset = useCallback(() => {
    setPrompt('');
    setCold(true);

    onReset?.();
  }, [onReset]);

  const handleSetSystem = useCallback(() => {
    setPrompt(''); // reset on submit

    onSetSystem({
      prompt,
      isSilly: !cold,
    });
  }, [cold, onSetSystem, prompt]);

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
          <label>
            <input
              type='checkbox'
              checked={cold}
              onChange={handleCheckboxChange}
            />
            Cold answers (warm is set to 0.5)
          </label>
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
