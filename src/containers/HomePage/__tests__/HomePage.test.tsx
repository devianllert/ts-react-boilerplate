import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/testUtils';

import HomePage from '../HomePage';

import '@testing-library/jest-dom/extend-expect';

describe('<HomePage />', (): void => {
  afterEach(cleanup);

  it('should render and match the snapshot', (): void => {
    const { container } = renderWithProviders(<HomePage />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with initial state', (): void => {
    const { getByText } = renderWithProviders(<HomePage />);

    expect(getByText(/home.title/)).toBeDefined();
  });
});
