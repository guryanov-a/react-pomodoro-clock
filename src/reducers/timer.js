import { CHANGE_TIMER_TIME, RESET } from '../constants';
import moment from 'moment';

const timer = (state = {}, action) => {
  switch(action.type) {
    case CHANGE_TIMER_TIME:
      if (state.id !== action.id) {
        return state;
      }

      const minutes = moment.duration(action.time).asMinutes();
      let newTime = action.time;

      if (minutes < 1) {
        newTime = 1;
      } else if (minutes > 60) {
        newTime = 60;
      }

      return {
        ...state,
        time: newTime,
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