import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import PomodoroApp from './PomodoroApp';

const Root = () => (
  <Provider store={ store }>
    <PomodoroApp />
  </Provider>
);

export default Root;