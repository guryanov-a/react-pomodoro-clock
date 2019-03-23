import { CHANGE_TIMER_TIME, CHANGE_TIMER } from '../constants';
import { getActiveTimer } from '../reducers/timers';
import { countdownChangeTime } from '../actions/countdown';

export const changeTimerTime = (id, newTime) => (dispatch, getState) => {
  dispatch({
    type: CHANGE_TIMER_TIME,
    id,
    time: newTime,
  });

  const state = getState();
  const activeTimer = getActiveTimer(state);

  if (id === activeTimer.id && !state.countdown.isActive) {
    dispatch(countdownChangeTime(activeTimer.time));
  }
};

export const changeTimer = (newTimerId) => ({
  type: CHANGE_TIMER,
  timer: newTimerId,
});
