import { RESET } from '../constants';
import { countdownStop } from './countdown';

export const reset = () => (dispatch) => {
  dispatch(countdownStop());
  dispatch({ type: RESET });
};