import React from 'react';
import { cleanup, fireEvent, act } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/testUtils';

import ReposPage from '../ReposPage';
import * as reposService from '../../../services/repos.service';

import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../services/repos.service');

describe('<Repos />', (): void => {
  afterEach(cleanup);

  it('should render and match the snapshot', (): void => {
    const { container } = renderWithProviders(<ReposPage />);

    expect(container).toMatchSnapshot();
  });

  it('should call fetch', (): void => {
    const { getByText } = renderWithProviders(<ReposPage />);
    const fetchSpy = jest.spyOn(reposService, 'fetchRepos');

    act(() => {
      fireEvent.click(getByText('Fetch'));
    });

    expect(fetchSpy).toHaveBeenCalled();
  });
});
