import React, { ReactChild } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../utils/testUtils';

import Button from '../Button';

describe('<Button />', () => {
  const children: ReactChild = 'Button';

  it('should render a children', () => {
    render(<Button>{children}</Button>);

    expect(screen.getByRole('button')).toHaveTextContent(children);
  });

  it('should render a disabled button if disabled prop is true', () => {
    render(<Button disabled>{children}</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should call onClick event', () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>{children}</Button>);

    userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not call events if disabled prop is true', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled>{children}</Button>);

    userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should rerender correctly', () => {
    const loading = 'Loading...';
    const { rerender } = render(<Button>{children}</Button>);

    expect(screen.getByRole('button')).toHaveTextContent(children);

    rerender(<Button disabled>{loading}</Button>);

    expect(screen.getByRole('button')).toHaveTextContent(loading);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render Link if to prop is true', () => {
    renderWithProviders(<Button to="/">{children}</Button>);

    expect(screen.getByRole('link')).toHaveTextContent(children);
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
