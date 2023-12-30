import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setChatConfiguration } from '../../store/slice/chat-configuration';

const ChatTemperature = () => {
  const dispatch = useAppDispatch();
  const cold = useAppSelector(
    ({ chatConfiguration }) => chatConfiguration.cold
  );
  const loading = useAppSelector(
    (state) => state.history.loading || state.chat.loading
  );

  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        const value = e.target.checked;

        dispatch(setChatConfiguration({ key: 'cold', value }));
      },
      [dispatch]
    );

  return (
    <label>
      <input
        type='checkbox'
        checked={cold}
        disabled={loading}
        onChange={handleCheckboxChange}
      />
      Cold answers (warm is set to 0.5)
    </label>
  );
};

export default ChatTemperature;
