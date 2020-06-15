/* eslint-disable import/prefer-default-export */
import React, { ReactElement } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { i18n as i18Next } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { render, RenderResult } from '@testing-library/react'; // eslint-disable-line

import configureStore, { EnhancedStore } from '../core/configureStore';
import i18nInstance from '../core/i18n';

export interface RenderProvidersOptions {
  initialState?: {};
  route?: string;
  routerHistory?: MemoryHistory;
  store?: EnhancedStore;
  i18n?: i18Next;
}

export interface RenderProvidersResult extends RenderResult {
  routerHistory: MemoryHistory;
  store: EnhancedStore;
  i18n: i18Next;
}

export type RenderProviders = (ui: ReactElement, options?: RenderProvidersOptions) => RenderProvidersResult;

const renderWithProviders: RenderProviders = (
  ui,
  {
    initialState = {},
    route = '/',
    routerHistory = createMemoryHistory({ initialEntries: [route] }),
    store = configureStore(initialState),
    i18n = i18nInstance,
  }: RenderProvidersOptions = {},
): RenderProvidersResult => ({
  ...render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router history={routerHistory}>{ui}</Router>
      </I18nextProvider>
    </Provider>,
  ),
  // adding `history` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
  store,
  routerHistory,
  i18n,
});

export {
  renderWithProviders,
};
