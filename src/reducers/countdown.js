import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { 
  COUNTDOWN_START,
  COUNTDOWN_CHANGE_TIME,
  COUNTDOWN_STOP,
  COUNTDOWN_PAUSE,
  COUNTDOWN_TICK,
  RESET,
} from '../constants';

momentDurationFormatSetup(moment);

const defaultState = {
  isActive: false,
  isPaused: false,
  time: '00:00',
};

const countdown = (
  state = defaultState,
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
      const nextTime = currentTime
        .subtract(1, 's')
        .format('mm:ss', {
            trim: false,
        });

      return {
        ...state,
        time: nextTime,
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
    case RESET:
      return defaultState;
    default:
      return state;
  }
};

export default countdown;