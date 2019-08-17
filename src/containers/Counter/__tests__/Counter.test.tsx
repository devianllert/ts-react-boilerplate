import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';

import renderWithRedux from '../../../utils/testUtils';

import Counter from '../Counter';

import '@testing-library/jest-dom/extend-expect';

describe('<Counter />', (): void => {
  afterEach(cleanup);

  it('should render and match the snapshot', (): void => {
    const { container } = renderWithRedux(<Counter />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with initial state', (): void => {
    const initialState = {
      counter: {
        count: 1000,
      },
    };

    const { getByText } = renderWithRedux(<Counter />, { initialState });

    expect(getByText(/1000/)).toBeDefined();
  });

  it('should increment count', (): void => {
    const { getByText } = renderWithRedux(<Counter />);

    expect(getByText(/0/)).toBeDefined();

    fireEvent.click(getByText('+'));

    expect(getByText(/1/)).toBeDefined();
  });

  it('should decrement count', (): void => {
    const { getByText } = renderWithRedux(<Counter />);

    expect(getByText(/0/)).toBeDefined();

    fireEvent.click(getByText('-'));

    expect(getByText(/-1/)).toBeDefined();
  });
});
