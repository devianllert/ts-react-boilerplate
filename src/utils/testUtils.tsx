import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, RenderResult } from '@testing-library/react'; // eslint-disable-line

import configureStore from '../configureStore';
import history from './history';

export interface ReduxRenderOptions {
  initialState?: {};
  store?: Store;
}

export interface ReduxRenderResult extends RenderResult {
  store: Store;
}

export type ReduxRender = (ui: ReactElement, options?: ReduxRenderOptions) => ReduxRenderResult;

const renderWithRedux: ReduxRender = (
  ui,
  { initialState = {}, store = configureStore(initialState, history) }: ReduxRenderOptions = {},
): ReduxRenderResult => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  /*
  ** adding `store` to the returned utilities to allow us
  ** to reference it in our tests (just try to avoid using
  ** this to test implementation details).
  */
  store,
});

export default renderWithRedux;
