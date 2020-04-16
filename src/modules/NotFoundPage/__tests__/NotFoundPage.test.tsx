import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/testUtils';

import NotFoundPage from '../NotFoundPage';

describe('<NotFoundPage />', (): void => {
  afterEach(cleanup);

  it('should render and match the snapshot', (): void => {
    const { container } = renderWithProviders(<NotFoundPage />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with initial state', (): void => {
    const { getByText } = renderWithProviders(<NotFoundPage />);

    expect(getByText(/404/)).toBeDefined();
  });
});
