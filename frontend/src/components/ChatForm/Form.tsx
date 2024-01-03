import { FC, FormEvent, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  sendPromptAction,
  sendSystemPromptAction,
} from '../../store/slice/chat';

export const Form: FC = () => {
  const dispatch = useAppDispatch();
  const disable = useAppSelector(
    (state) =>
      state.history.loading || state.chat.loading || !!state.chat.error?.message
  );

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

      dispatch(sendPromptAction(prompt));
    },
    [dispatch, prompt]
  );

  const handleSetSystem = useCallback(() => {
    setPrompt(''); // reset on submit

    dispatch(sendSystemPromptAction(prompt));
  }, [dispatch, prompt]);

  return (
    <form id='form' onSubmit={handleSubmit}>
      <div className='chat-form-input'>
        <textarea
          id='prompt'
          autoFocus
          value={prompt}
          onChange={handleChange}
          disabled={disable}
        ></textarea>
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
  );
};
