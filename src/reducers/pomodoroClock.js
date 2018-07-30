import { combineReducers } from 'redux';
import countdown from './countdown';
import timers from './timers';

const pomodoroClock = combineReducers({
  timers,
  countdown,
});

export { pomodoroClock };