import React, { ReactChild } from 'react';
import { cleanup, render } from '@testing-library/react';
import { create } from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import Button from '../Button';

describe('<Button />', (): void => {
  afterEach(cleanup);

  const children: ReactChild = 'Button';

  it('should render a children', (): void => {
    const { getByRole } = render(<Button>{children}</Button>);

    expect(getByRole('button')).toHaveTextContent(children);
  });

  it('should render a disabled button if disabled prop is true', (): void => {
    const { getByRole } = render(<Button disabled>{children}</Button>);

    expect(getByRole('button')).toHaveAttribute('disabled');
  });

  it('should rerender correctly', (): void => {
    const loading = 'Loading...';
    const { rerender, getByRole } = render(<Button>{children}</Button>);

    expect(getByRole('button')).toHaveTextContent(children);

    rerender(<Button disabled>{loading}</Button>);

    expect(getByRole('button')).toHaveTextContent(loading);
    expect(getByRole('button')).toHaveAttribute('disabled');
  });

  it('should render and match the snapshot', (): void => {
    const defaultButton = create(<Button>{children}</Button>);
    const disabledButton = create(<Button disabled>{children}</Button>);

    expect(defaultButton.toJSON()).toMatchSnapshot();
    expect(disabledButton.toJSON()).toMatchSnapshot();
  });
});
