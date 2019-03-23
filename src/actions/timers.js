import { CHANGE_TIMER_TIME, CHANGE_TIMER } from '../constants';

export const changeTimerTime = (id, newTime) => ({
  type: CHANGE_TIMER_TIME,
  id,
  time: newTime,
});

export const changeTimer = (newTimerId) => ({
  type: CHANGE_TIMER,
  timer: newTimerId,
});
