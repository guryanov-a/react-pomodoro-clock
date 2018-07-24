import { RESET } from '../constants';

const defaultState = 5;

const breakTimer = (state = defaultState, action) => {
  switch (action.type) {
    case RESET:
      return defaultState;
    default:
      return state;
  }
};

export default breakTimer;