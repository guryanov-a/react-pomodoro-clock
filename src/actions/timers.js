import { CHANGE_TIMER_TIME, CHANGE_TIMER } from '../constants';
import { getActiveTimer } from '../reducers/timers';
import { countdownChangeTime } from '../actions/countdown';

export const changeTimerTime = (id, newTime) => (dispatch, getState) => {
  dispatch({
    type: CHANGE_TIMER_TIME,
    id,
    time: newTime,
  });

  const { timers, countdown } = getState();
  const activeTimer = getActiveTimer(timers);

  if (id === activeTimer.id && !countdown.isActive) {
    dispatch(countdownChangeTime(activeTimer.time));
  }
};

export const changeTimer = (newTimerId) => ({
  type: CHANGE_TIMER,
  timer: newTimerId,
});