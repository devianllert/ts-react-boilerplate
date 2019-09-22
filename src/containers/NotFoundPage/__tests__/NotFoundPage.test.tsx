import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithRouter } from '../../../utils/testUtils';

import NotFoundPage from '../NotFoundPage';

import '@testing-library/jest-dom/extend-expect';

describe('<NotFoundPage />', (): void => {
  afterEach(cleanup);

  it('should render and match the snapshot', (): void => {
    const { container } = renderWithRouter(<NotFoundPage />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with initial state', (): void => {
    const { getByText } = renderWithRouter(<NotFoundPage />);

    expect(getByText(/404/)).toBeDefined();
  });
});
