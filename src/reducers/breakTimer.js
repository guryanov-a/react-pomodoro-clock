import { RESET, CHANGE_BREAK_TIME } from '../constants';

const defaultState = '5:00';

const breakTimer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_BREAK_TIME:
      return action.time;
    case RESET:
      return defaultState;
    default:
      return state;
  }
};

export default breakTimer;