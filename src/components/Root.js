import React from 'react';
import { Provider } from 'react-redux';
import PomodoroApp from './PomodoroApp';

const Root = ({ store }) => (
  <Provider store={ store }>
    <PomodoroApp />
  </Provider>
);

export default Root;