import { all } from 'redux-saga/effects';
import {
  watchCountdownStartAsync,
  watchCountdownStopAsync,
  watchCountdownPauseAsync,
  watchCountdownTickAsync,
} from './countdown';
import { watchResetAsync } from './reset';
import { watchChangeTimerTimeAsync } from './timers';

export default function* rootSaga() {
  yield all([
    watchCountdownStartAsync(),
    watchCountdownStopAsync(),
    watchCountdownPauseAsync(),
    watchResetAsync(),
    watchChangeTimerTimeAsync(),
    watchCountdownTickAsync(),
  ]);
}
