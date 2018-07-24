import { SET_TIMER_TIME } from '../constants';

export const setTimerTime = (newTime) => ({
  type: SET_TIMER_TIME,
  time: newTime,
});