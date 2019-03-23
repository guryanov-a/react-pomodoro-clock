import { CHANGE_TIMER_TIME, RESET } from '../constants';

const timer = (state = {}, action) => {
  switch(action.type) {
    case CHANGE_TIMER_TIME:
      if (state.id !== action.id) {
        return state;
      }

      let newTime = action.time;

      if (newTime < 1) {
        newTime = 1;
      } else if (newTime > 60) {
        newTime = 60;
      }

      return {
        ...state,
        time: newTime,
      };
    case RESET:
      return {
        ...state,
        time: state.defaultTime,
      };
    default:
      return state;
  }
};

export default timer;
