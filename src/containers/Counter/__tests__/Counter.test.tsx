import React from 'react';
import { Provider } from 'react-redux';
import { cleanup, render, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import configureStore from '../../../configureStore';

import Counter from '../Counter';

describe('<Counter />', (): void => {
  afterEach(cleanup);

  const store = configureStore();

  it('should render and match the snapshot', (): void => {
    const { container } = render(
      <Provider store={store}>
        <Counter />
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should increment count', (): void => {
    const { getByText } = render(
      <Provider store={store}>
        <Counter />
      </Provider>,
    );

    expect(getByText(/0/)).toBeDefined();

    fireEvent.click(getByText('+'));

    expect(getByText(/1/)).toBeDefined();
  });
});
