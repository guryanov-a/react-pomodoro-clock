import { CHANGE_TIMER, CHANGE_TIMER_TIME, RESET } from '../constants';
import timerReducer from './timer';

const timers = (state = {}, action) => {
  switch(action.type) {
    case CHANGE_TIMER:
      return {
        ...state,
        currentTimer: action.timer,
      }
    case CHANGE_TIMER_TIME:
      return {
        ...state,
        items: state.items.map(timer => timerReducer(timer, action)),
      }
    case RESET:
      return {
        ...state,
        currentTimer: state.defaultTimer,
        items: state.items.map(timer => timerReducer(timer, action)),
      }
    default:
      return state;
  }
};

export default timers;