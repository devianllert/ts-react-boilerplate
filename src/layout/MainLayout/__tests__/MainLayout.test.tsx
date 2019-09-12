import React, { ReactChild } from 'react';
import { cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { renderWithRouter } from '../../../utils/testUtils';

import MainLayout from '../MainLayout';

describe('<MainLayout />', (): void => {
  afterEach(cleanup);

  const children: ReactChild = 'MainLayout';

  it('should render a children', (): void => {
    const { getByText } = renderWithRouter(<MainLayout>{children}</MainLayout>);

    expect(getByText(children)).toHaveTextContent(children);
  });

  it('should render and match the snapshot', (): void => {
    const mainLayout = renderWithRouter(<MainLayout>{children}</MainLayout>);

    expect(mainLayout.container).toMatchSnapshot();
  });
});
