import {
  format as formatDate,
  parse as parseDate,
  subSeconds,
  addMinutes,
} from 'date-fns';
import {
  COUNTDOWN_START,
  COUNTDOWN_CHANGE_TIME,
  COUNTDOWN_STOP,
  COUNTDOWN_PAUSE,
  COUNTDOWN_TICK,
} from '../constants';

const defaultState = {
  isActive: false,
  isPaused: false,
  time: '00:00',
};

const countdown = (
  state = defaultState,
  action,
) => {
  const timeFormat = 'mm:ss';

  switch(action.type) {
    case COUNTDOWN_CHANGE_TIME:
    {
      const newTime = addMinutes(new Date(0), action.time);

      return {
        ...state,
        time: formatDate(
          newTime,
          timeFormat,
        ),
      };
    }
    case COUNTDOWN_START:
      return {
        ...state,
        isPaused: false,
        isActive: true,
      };
    case COUNTDOWN_TICK:
    {
      const currentTime = parseDate(state.time.toString(), timeFormat, new Date(0));
      const newTime = subSeconds(currentTime, 1);

      return {
        ...state,
        time: formatDate(
          newTime,
          timeFormat,
        ),
      };
    }
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
        isActive: false,
      };
    default:
      return state;
  }
};

export default countdown;
