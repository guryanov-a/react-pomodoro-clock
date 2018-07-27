import { CHANGE_TIMER_TIME } from '../constants';

export const changeTimerTime = (id, newTime) => ({
  type: CHANGE_TIMER_TIME,
  id,
  time: newTime,
});