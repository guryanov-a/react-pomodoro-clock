import { eventChannel } from 'redux-saga';
import {
  put,
  takeLatest,
  takeEvery,
  call,
  select
} from 'redux-saga/effects';
import { getNextTimer } from '../reducers/timers';
import {
  changeTimer,
  audioPlay,
  countdownChangeTime,
  countdownTick,
} from '../actions';
import {
  COUNTDOWN_PAUSE,
  COUNTDOWN_START,
  COUNTDOWN_STOP, COUNTDOWN_TICK,
} from '../constants';

let countdownTimer;

function countdown() {
  return eventChannel((emitter) => {
    let i = 0;
    countdownTimer = setInterval(() => {
      i++;
      emitter({ i });
    }, 1000);

    return () => {
      clearInterval(countdownTimer);
    };
  })
}

function* countdownStartAsync() {
  clearInterval(countdownTimer);

  let countdownChannel = yield call(countdown);
  yield takeEvery(countdownChannel, function* () {
    yield put(countdownTick());
  });
}
export function* watchCountdownStartAsync() {
  yield takeLatest(COUNTDOWN_START, countdownStartAsync);
}

function* countdownTickAsync() {
  const state = yield select();
  const nextTimer = getNextTimer(state);

  if (state.countdown.isActive && state.countdown.time === '00:00') {
    yield* countdownStopAsync();
    yield put(audioPlay());
    yield put(changeTimer(nextTimer));
    yield put(countdownChangeTime(nextTimer.time));
    yield* countdownStartAsync();
  }
}
export function* watchCountdownTickAsync() {
  yield takeLatest(COUNTDOWN_TICK, countdownTickAsync);
}

function countdownStopAsync() {
  clearInterval(countdownTimer);
}
export function* watchCountdownStopAsync() {
  yield takeLatest(COUNTDOWN_STOP, countdownStopAsync);
}

function countdownPauseAsync() {
  clearInterval(countdownTimer);
}
export function* watchCountdownPauseAsync() {
  yield takeLatest(COUNTDOWN_PAUSE, countdownPauseAsync);
}
