import { CHANGE_SESSION_TIME } from '../constants';

export const changeSessionTime = (newTime) => ({
  type: CHANGE_SESSION_TIME,
  time: newTime,
});