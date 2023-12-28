import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/slice/hooks';
import { setRoute } from '../../../store/slice/route';

const SwitchToHistory: FC = () => {
  const dispatch = useAppDispatch();
  const disable = useAppSelector(
    (state) =>
      state.history.loading ||
      state.chat.loading ||
      state.history.list.length === 0
  );

  const handleClick = useCallback(() => {
    dispatch(setRoute('history'));
  }, [dispatch]);

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={disable}
      className='show-history'
    >
      Show history
    </button>
  );
};

export default SwitchToHistory;
