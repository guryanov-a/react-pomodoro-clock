import { 
  COUNTDOWN_START,
  COUNTDOWN_CHANGE_TIME,
  COUNTDOWN_STOP,
  COUNTDOWN_PAUSE,
  COUNTDOWN_TICK,
} from '../constants';

let countdownTimer = null;

export const countdownStart = () => (dispatch) => {
  clearInterval(countdownTimer);
  dispatch({ type: COUNTDOWN_START });
  countdownTick();
  countdownTimer = setInterval(() => dispatch(countdownTick()), 1000);
};

const countdownTick = () => 
  ({ type: COUNTDOWN_TICK });

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