import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Root from '../components/Root';
import configureStore from '../store';

it('renders without crashing', () => {
  const store = configureStore();
  const div = document.createElement('div');

  render(<Root store={ store } />, div);
  unmountComponentAtNode(div);
});
