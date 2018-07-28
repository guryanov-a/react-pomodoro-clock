import { createStore } from 'redux';
import { pomodoroClock } from '../reducers';

const persistedState = {
  timers: {
    defaultTimer: 'session',
    currentTimer: 'session',
    items: [
      {
        id: 'break',
        title: 'Break Length',
        defaultTime: 5,
        time: 5,
      },
      {
        id: 'session',
        title: 'Session Length',
        defaultTime: 25,
        time: 25,
      }
    ]
  },
};

const enhancer = process.env.NODE_ENV === 'production' 
  ? undefined 
  : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  pomodoroClock,
  persistedState,
  enhancer,
);

export default store;