import React, { ReactElement } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
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

export interface RouterRenderOptions {
  route?: string;
  routerHistory?: MemoryHistory;
}

export interface RouterRenderResult extends RenderResult {
  routerHistory: MemoryHistory;
}

export type RouterRender = (ui: ReactElement, options?: RouterRenderOptions) => RouterRenderResult;

export type RouterReduxRenderOptions = RouterRenderOptions & ReduxRenderOptions;

export type RouterReduxRenderResult = RouterRenderResult & ReduxRenderResult;

export type RouterReduxRender = (ui: ReactElement, options?: RouterReduxRenderOptions) => RouterReduxRenderResult;

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

const renderWithRouter: RouterRender = (
  ui,
  { route = '/', routerHistory = createMemoryHistory({ initialEntries: [route] }) }: RouterRenderOptions = {},
): RouterRenderResult => ({
  ...render(<Router history={routerHistory}>{ui}</Router>),
  // adding `history` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
  routerHistory,
});

const renderWithRouterAndRedux: RouterReduxRender = (
  ui,
  {
    initialState = {},
    route = '/',
    routerHistory = createMemoryHistory({ initialEntries: [route] }),
    store = configureStore(initialState, history),
  }: RouterReduxRenderOptions = {},
): RouterReduxRenderResult => ({
  ...render(
    <Provider store={store}>
      <Router history={routerHistory}>{ui}</Router>
    </Provider>,
  ),
  // adding `history` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
  store,
  routerHistory,
});

export {
  renderWithRedux,
  renderWithRouter,
  renderWithRouterAndRedux,
};
