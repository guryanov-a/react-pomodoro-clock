import { 
  COUNTDOWN_START,
  COUNTDOWN_CHANGE_TIME,
  COUNTDOWN_STOP,
  COUNTDOWN_PAUSE,
  COUNTDOWN_TICK,
} from '../constants';
import { getNextTimer } from '../reducers/timers';
import { changeTimer } from './timers';
import { audioPlay } from './audio';

let countdownTimer = null;

export const countdownStart = () => (dispatch) => {
  clearInterval(countdownTimer);
  dispatch({ type: COUNTDOWN_START });
  countdownTick();
  countdownTimer = setInterval(() => dispatch(countdownTick()), 1000);
};

const countdownTick = () => (dispatch, getState) => {
  dispatch({ type: COUNTDOWN_TICK });

  const { countdown, timers } = getState();
  const nextTimer = getNextTimer(timers);

  if (countdown.isActive && countdown.time === '00:00') {
    dispatch(countdownStop());
    dispatch(audioPlay());
    dispatch(changeTimer(nextTimer));
    dispatch(countdownChangeTime(nextTimer.time));
    dispatch(countdownStart());
  }
};

export const countdownStop = () => { 
  clearInterval(countdownTimer);
  return { type: COUNTDOWN_STOP };
};

export const countdownPause = () => { 
  clearInterval(countdownTimer);
  return { type: COUNTDOWN_PAUSE };
};

export const countdownChangeTime = (newTime) => ({ 
  type: COUNTDOWN_CHANGE_TIME,
  time: newTime,
});