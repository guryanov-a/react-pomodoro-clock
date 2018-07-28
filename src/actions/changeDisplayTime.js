import { CHANGE_DISPLAY_TIME } from '../constants';

export const changeDisplayTime = (newTime) => ({
  type: CHANGE_DISPLAY_TIME,
  time: newTime,
});