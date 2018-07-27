import { CHANGE_TIMER_TIME, RESET } from '../constants';

const timer = (state = {}, action) => {
  switch(action.type) {
    case CHANGE_TIMER_TIME:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        time: action.time,
      }
    case RESET:
      return {
        ...state,
        time: state.defaultTime,
      }
    default:
      return state;
  }
};

export default timer;