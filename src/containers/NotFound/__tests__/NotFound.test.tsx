import React from 'react';
import { cleanup, render } from '@testing-library/react';

import NotFound from '../NotFound';

import '@testing-library/jest-dom/extend-expect';

describe('<NotFound />', (): void => {
  afterEach(cleanup);

  it('should render and match the snapshot', (): void => {
    const { container } = render(<NotFound />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with initial state', (): void => {
    const { getByText } = render(<NotFound />);

    expect(getByText(/Page Not Found!/)).toBeDefined();
  });
});
