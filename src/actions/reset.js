import { RESET } from '../constants';

export const reset = () => (dispatch) => {
  dispatch({ type: RESET });
};