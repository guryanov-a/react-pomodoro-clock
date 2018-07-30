import { 
  COUNTDOWN_START,
  COUNTDOWN_CHANGE_TIME,
  COUNTDOWN_PAUSE,
  COUNTDOWN_TICK,
} from '../constants';

let countdownTimer = null;

export const countdownStart = () => (dispatch) => {
  clearInterval(countdownTimer);
  countdownTimer = setInterval(() => dispatch(countdownTick()), 1000);
  dispatch({ type: COUNTDOWN_START });
  countdownTick();
};

const countdownTick = () => ({ type: COUNTDOWN_TICK });

export const countdownStop = () => { 
  clearInterval(countdownTimer);
  return { type: COUNTDOWN_PAUSE };
};

export const countdownChangeTime = (newTime) => ({ 
  type: COUNTDOWN_CHANGE_TIME,
  time: newTime,
});