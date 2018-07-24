import { createStore } from 'redux';
import { pomodoroClock } from '../reducers';

const enhancer = process.env.NODE_ENV === 'production' 
  ? undefined 
  : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  pomodoroClock,
  undefined,
  enhancer,
);

export default store;