import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Home from '../Home';

import '@testing-library/jest-dom/extend-expect';

describe('<Home />', (): void => {
  afterEach(cleanup);

  it('should render and match the snapshot', (): void => {
    const { container } = render(<Home />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with initial state', (): void => {
    const { getByText } = render(<Home />);

    expect(getByText(/React Typescript Boilerplate/)).toBeDefined();
  });
});
