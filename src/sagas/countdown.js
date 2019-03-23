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
  countdownStop,
  countdownStart,
} from '../actions';
import {
  COUNTDOWN_PAUSE,
  COUNTDOWN_START,
  COUNTDOWN_STOP, COUNTDOWN_TICK,
} from '../constants';

let countdownChannel;
const delay = (ms) => new Promise(res => setTimeout(res, ms))

function countdown() {
  return eventChannel((emitter) => {
    let i = 0;
    emitter({ i });

    const countdownInterval = setInterval(() => {
      i++;
      emitter({ i });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  })
}

function* countdownStartAsync() {
  if (countdownChannel) {
    yield countdownChannel.close();
    countdownChannel = null;
  }

  countdownChannel = yield call(countdown);
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
    yield put(countdownStop());
    yield put(audioPlay());
    yield delay(1000);
    yield put(changeTimer(nextTimer));
    yield put(countdownChangeTime(nextTimer.time));
    yield put(countdownStart());
  }
}
export function* watchCountdownTickAsync() {
  yield takeLatest(COUNTDOWN_TICK, countdownTickAsync);
}

function countdownStopAsync() {
  if (countdownChannel) countdownChannel.close();
}
export function* watchCountdownStopAsync() {
  yield takeLatest(COUNTDOWN_STOP, countdownStopAsync);
}

function countdownPauseAsync() {
  if (countdownChannel) countdownChannel.close();
}
export function* watchCountdownPauseAsync() {
  yield takeLatest(COUNTDOWN_PAUSE, countdownPauseAsync);
}
