import { RESET } from '../constants';

const defaultState = '25:00';

const sessionTimer = (state = defaultState, action) => {
  switch (action.type) {
    case RESET:
      return defaultState;
    default:
      return state;
  }
};

export default sessionTimer;