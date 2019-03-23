import { CHANGE_TIMER, CHANGE_TIMER_TIME, RESET } from '../constants';
import timerReducer from './timer';
import { createSelector } from 'reselect';

const timers = (state = {}, action) => {
  switch(action.type) {
    case CHANGE_TIMER:
      return {
        ...state,
        currentTimer: action.timer.id,
      };
    case CHANGE_TIMER_TIME:
      return {
        ...state,
        items: state.items.map(timer => timerReducer(timer, action)),
      };
    case RESET:
      return {
        ...state,
        currentTimer: state.defaultTimer,
        items: state.items.map(timer => timerReducer(timer, action)),
      };
    default:
      return state;
  }
};

export default timers;

const getTimers = (state) => state.timers;

export const getActiveTimer = createSelector(
  [getTimers],
  (timers) => {
    return timers.items.find(timer => timers.currentTimer === timer.id);
  },
);

export const getDefaultTimer = createSelector(
  [getTimers],
  (timers) => {
    return timers.items.find(timer => timer.id === timers.defaultTimer);
  },
);

export const getNextTimer = createSelector(
  [getTimers, getActiveTimer],
  (timers, activeTimer) => {
    const currentTimerIndex = timers.items.indexOf(activeTimer);
    const nextTimerIndex = currentTimerIndex + 1 < timers.items.length ? currentTimerIndex + 1 : 0;

    return timers.items[nextTimerIndex];
  },
);
