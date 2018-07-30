import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { pomodoroClock } from '../reducers';

const configureStore = () => {
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
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store = createStore(
    pomodoroClock,
    persistedState,
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  );
  
  return store;
};


export default configureStore;