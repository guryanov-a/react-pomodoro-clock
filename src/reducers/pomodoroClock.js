import { combineReducers } from 'redux';
import countdown from './countdown';
import timers from './timers';
import audio from './audio';

const pomodoroClock = combineReducers({
  timers,
  countdown,
  audio,
});

export { pomodoroClock };