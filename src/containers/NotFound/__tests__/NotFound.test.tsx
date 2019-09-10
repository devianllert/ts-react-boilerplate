import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithRouter } from '../../../utils/testUtils';

import NotFound from '../NotFound';

import '@testing-library/jest-dom/extend-expect';

describe('<NotFound />', (): void => {
  afterEach(cleanup);

  it('should render and match the snapshot', (): void => {
    const { container } = renderWithRouter(<NotFound />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with initial state', (): void => {
    const { getByText } = renderWithRouter(<NotFound />);

    expect(getByText(/Page Not Found!/)).toBeDefined();
  });
});
