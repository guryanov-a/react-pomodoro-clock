
import { put, takeLatest } from 'redux-saga/effects';
import { countdownStop } from '../actions';
import { RESET } from '../constants';

function* resetAsync() {
  yield put(countdownStop());
}
export function* watchResetAsync() {
  yield takeLatest(RESET, resetAsync);
}
