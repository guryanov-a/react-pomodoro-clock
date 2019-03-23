import {
  COUNTDOWN_CHANGE_TIME,
  COUNTDOWN_STOP,
  COUNTDOWN_PAUSE,
  COUNTDOWN_START,
  COUNTDOWN_TICK,
} from '../constants';

export const countdownStart = () => ({ type: COUNTDOWN_START });
export const countdownStop = () => ({ type: COUNTDOWN_STOP });
export const countdownPause = () => ({ type: COUNTDOWN_PAUSE });
export const countdownTick = () => ({ type: COUNTDOWN_TICK });
export const countdownChangeTime = (newTime) => ({
  type: COUNTDOWN_CHANGE_TIME,
  time: newTime,
});
