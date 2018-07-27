import { CHANGE_DISPLAY_TIME } from '../constants';

const timeDisplay = (state = '00:00', action) => {
  switch (action.type) {
    case CHANGE_DISPLAY_TIME:
      return action.time;
    default:
      return state;
  }
};

export default timeDisplay;