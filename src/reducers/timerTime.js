import { RESET, SET_TIMER_TIME } from '../constants';

const defaultState = '00:00';

const timerTime = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TIMER_TIME:
      return action.time;
    case RESET:
      return defaultState;
    default:
      return state;
  }
};

export default timerTime;