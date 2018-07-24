import { CHANGE_BREAK_TIME } from '../constants';

export const changeBreakTime = (newTime) => ({
  type: CHANGE_BREAK_TIME,
  time: newTime,
});