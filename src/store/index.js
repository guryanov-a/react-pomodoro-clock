import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { pomodoroClock } from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
  const defaultState = {
    timers: {
      defaultTimer: 'session',
      currentTimer: 'session',
      items: [
        {
          id: 'break',
          title: 'Break Length',
          countdownTitle: 'Break',
          defaultTime: 5,
          time: 5,
        },
        {
          id: 'session',
          title: 'Session Length',
          countdownTitle: 'Session',
          defaultTime: 25,
          time: 25,
        }
      ]
    },
  };

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    pomodoroClock,
    defaultState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
