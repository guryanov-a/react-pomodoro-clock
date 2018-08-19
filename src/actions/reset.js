import { RESET } from '../constants';
import { countdownStop } from '../actions'

export const reset = () => (dispatch) => {
  dispatch(countdownStop);
  dispatch({ type: RESET });
};