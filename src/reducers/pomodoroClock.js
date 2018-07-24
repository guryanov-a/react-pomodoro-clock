import { combineReducers } from 'redux';
import breakTimer from './breakTimer';
import sessionTimer from './sessionTimer';

const pomodoroClock = combineReducers({
  breakTimer,
  sessionTimer,
});

export { pomodoroClock };