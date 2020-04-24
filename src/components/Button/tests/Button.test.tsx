import React, { ReactChild } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/testUtils';

import Button from '../Button';

describe('<Button />', () => {
  afterEach(cleanup);

  const children: ReactChild = 'Button';

  it('should render a children', () => {
    const { getByRole } = render(<Button>{children}</Button>);

    expect(getByRole('button')).toHaveTextContent(children);
  });

  it('should render a disabled button if disabled prop is true', () => {
    const { getByRole } = render(<Button disabled>{children}</Button>);

    expect(getByRole('button')).toHaveAttribute('disabled');
  });

  it('should call onClick event', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick}>{children}</Button>);

    fireEvent.click(getByRole('button'));

    expect(onClick).toHaveBeenCalled();
  });

  it('should not call events if disabled prop is true', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick} disabled>{children}</Button>);

    fireEvent.click(getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should rerender correctly', () => {
    const loading = 'Loading...';
    const { rerender, getByRole } = render(<Button>{children}</Button>);

    expect(getByRole('button')).toHaveTextContent(children);

    rerender(<Button disabled>{loading}</Button>);

    expect(getByRole('button')).toHaveTextContent(loading);
    expect(getByRole('button')).toHaveAttribute('disabled');
  });

  it('should render Link if to prop is true', () => {
    const { getByRole } = renderWithProviders(<Button to="/">{children}</Button>);

    expect(getByRole('link')).toHaveTextContent(children);
  });

  it('should render and match the snapshot', (): void => {
    const defaultButton = render(<Button>{children}</Button>);
    const disabledButton = render(<Button disabled>{children}</Button>);
    const LinkButton = renderWithProviders(<Button to="/">{children}</Button>);

    expect(defaultButton.container.firstChild).toMatchSnapshot();
    expect(disabledButton.container.firstChild).toMatchSnapshot();
    expect(LinkButton.container.firstChild).toMatchSnapshot();
  });
});
