import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { 
  COUNTDOWN_START,
  COUNTDOWN_CHANGE_TIME,
  COUNTDOWN_PAUSE,
  COUNTDOWN_TICK,
} from '../constants';

momentDurationFormatSetup(moment);

const countdown = (
  state = {
    isActive: false,
    time: '00:00',
  },
  action,
) => {
  const currentTime = moment.duration(state.time);

  switch(action.type) {
    case COUNTDOWN_CHANGE_TIME:
      return action.time;
    case COUNTDOWN_START:
      return {
        ...state,
        isActive: true,
      }
    case COUNTDOWN_TICK:
      return {
        ...state,
        time: currentTime.subtract(1, 's').format('mm:ss'),
      };
    case COUNTDOWN_PAUSE:
      return {
        ...state,
        isActive: false,
      };
    default:
      return state;
  }
};

export default countdown;