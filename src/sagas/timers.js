import { put, takeEvery, select } from 'redux-saga/effects';
import { getActiveTimer } from '../reducers/timers';
import { countdownChangeTime } from '../actions';
import {CHANGE_TIMER_TIME} from '../constants';

export function* changeTimerTimeAsync(action) {
  const state = yield select();
  const activeTimer = getActiveTimer(state);

  if (action.id === activeTimer.id && !state.countdown.isActive) {
    yield put(countdownChangeTime(activeTimer.time));
  }
}
export function* watchChangeTimerTimeAsync() {
  yield takeEvery(CHANGE_TIMER_TIME, changeTimerTimeAsync);
}
