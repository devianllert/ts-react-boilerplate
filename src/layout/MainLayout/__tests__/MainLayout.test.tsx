import React, { ReactChild } from 'react';
import { cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { renderWithProviders } from '../../../utils/testUtils';

import MainLayout from '../MainLayout';

window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

describe('<MainLayout />', (): void => {
  afterEach(cleanup);

  const children: ReactChild = 'MainLayout';

  it('should render a children', (): void => {
    const { getByText } = renderWithProviders(<MainLayout>{children}</MainLayout>);

    expect(getByText(children)).toHaveTextContent(children);
  });

  it('should render and match the snapshot', (): void => {
    const mainLayout = renderWithProviders(<MainLayout>{children}</MainLayout>);

    expect(mainLayout.container).toMatchSnapshot();
  });
});
