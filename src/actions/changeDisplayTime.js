import { CHANGE_DISPLAY_TIME } from '../constants';

export const changeTimerTime = (newTime) => ({
  type: CHANGE_DISPLAY_TIME,
  time: newTime,
});