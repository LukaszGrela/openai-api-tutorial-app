import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setChatConfiguration } from '../../store/slice/chat-configuration';

//
const temperature = Number(import.meta.env.VITE_AI_TEMPERATURE);

const ChatTemperature = () => {
  const dispatch = useAppDispatch();
  const disable = useAppSelector(
    (state) =>
      state.history.loading || state.chat.loading || !!state.chat.error?.message
  );
  const cold = useAppSelector(
    ({ chatConfiguration }) => chatConfiguration.temperature === 0
  );

  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        const value = e.target.checked;

        dispatch(
          setChatConfiguration({
            key: 'temperature',
            value: value ? 0 : temperature,
          })
        );
      },
      [dispatch]
    );

  return (
    <label>
      <input
        type='checkbox'
        checked={cold}
        disabled={disable}
        onChange={handleCheckboxChange}
      />
      Cold answers (warm is set to {temperature})
    </label>
  );
};

export default ChatTemperature;
