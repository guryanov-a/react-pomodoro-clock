import { combineReducers } from 'redux';
import timeDisplay from './timeDisplay';
import timers from './timers';

const pomodoroClock = combineReducers({
  timers,
  timeDisplay,
});

export { pomodoroClock };