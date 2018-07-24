import { combineReducers } from 'redux';
import breakTimer from './breakTimer';
import sessionTimer from './sessionTimer';
import timerTime from './timerTime';

const pomodoroClock = combineReducers({
  breakTimer,
  sessionTimer,
  timerTime,
});

export { pomodoroClock };