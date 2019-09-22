import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';

import { renderWithRouterAndRedux } from '../../../utils/testUtils';

import CounterPage from '../CounterPage';

import '@testing-library/jest-dom/extend-expect';

describe('<Counter />', (): void => {
  afterEach(cleanup);

  it('should render and match the snapshot', (): void => {
    const { container } = renderWithRouterAndRedux(<CounterPage />);

    expect(container).toMatchSnapshot();
  });

  it('should render with initial state', (): void => {
    const initialState = {
      counter: {
        count: 1000,
      },
    };

    const { getByText } = renderWithRouterAndRedux(<CounterPage />, { initialState });

    expect(getByText(/1000/)).toBeDefined();
  });

  it('should increment count', (): void => {
    const { getByText } = renderWithRouterAndRedux(<CounterPage />);

    expect(getByText(/0/)).toBeDefined();

    fireEvent.click(getByText('+'));

    expect(getByText(/1/)).toBeDefined();
  });

  it('should decrement count', (): void => {
    const { getByText } = renderWithRouterAndRedux(<CounterPage />);

    expect(getByText(/0/)).toBeDefined();

    fireEvent.click(getByText('-'));

    expect(getByText(/-1/)).toBeDefined();
  });
});
