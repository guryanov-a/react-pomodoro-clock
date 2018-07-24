import { RESET, CHANGE_SESSION_TIME } from '../constants';

const defaultState = '25:00';

const sessionTimer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_SESSION_TIME:
      return action.time;
    case RESET:
      return defaultState;
    default:
      return state;
  }
};

export default sessionTimer;