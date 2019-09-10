import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithRouter } from '../../../utils/testUtils';

import Home from '../Home';

import '@testing-library/jest-dom/extend-expect';

describe('<Home />', (): void => {
  afterEach(cleanup);

  it('should render and match the snapshot', (): void => {
    const { container } = renderWithRouter(<Home />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with initial state', (): void => {
    const { getByText } = renderWithRouter(<Home />);

    expect(getByText(/React Typescript Boilerplate/)).toBeDefined();
  });
});
