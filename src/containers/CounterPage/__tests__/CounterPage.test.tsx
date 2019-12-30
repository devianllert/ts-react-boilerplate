import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/testUtils';

import CounterPage from '../CounterPage';

import '@testing-library/jest-dom/extend-expect';

describe('<Counter />', (): void => {
  afterEach(cleanup);

  it('should render and match the snapshot', (): void => {
    const { container } = renderWithProviders(<CounterPage />);

    expect(container).toMatchSnapshot();
  });

  it('should increment count', (): void => {
    const { getByText } = renderWithProviders(<CounterPage />);

    expect(getByText(/0/)).toBeDefined();

    fireEvent.click(getByText('+'));

    expect(getByText(/1/)).toBeDefined();
  });

  it('should decrement count', (): void => {
    const { getByText } = renderWithProviders(<CounterPage />);

    expect(getByText(/0/)).toBeDefined();

    fireEvent.click(getByText('-'));

    expect(getByText(/-1/)).toBeDefined();
  });
});
