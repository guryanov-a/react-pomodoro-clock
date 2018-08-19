import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { 
  COUNTDOWN_START,
  COUNTDOWN_CHANGE_TIME,
  COUNTDOWN_STOP,
  COUNTDOWN_PAUSE,
  COUNTDOWN_TICK,
} from '../constants';

momentDurationFormatSetup(moment);

const countdown = (
  state = {
    isActive: false,
    isPaused: false,
    time: '00:00',
  },
  action,
) => {
  const currentTime = moment.duration(`00:${state.time}`);

  switch(action.type) {
    case COUNTDOWN_CHANGE_TIME:
      return {
        ...state,
        time: action.time,
      };
    case COUNTDOWN_START:
      return {
        ...state,
        isPaused: false,
        isActive: true,
      }
    case COUNTDOWN_TICK:
      return {
        ...state,
        time: currentTime.subtract(1, 's').format('mm:ss'),
      };
    case COUNTDOWN_STOP:
      return {
        ...state,
        isPaused: false,
        isActive: false,
      };
    case COUNTDOWN_PAUSE:
      return {
        ...state,
        isPaused: true,
      };
    default:
      return state;
  }
};

export default countdown;