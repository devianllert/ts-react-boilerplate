import React, { ReactChild } from 'react';
import { cleanup, fireEvent } from '@testing-library/react';

import { renderWithRouter } from '../../../utils/testUtils';

import '@testing-library/jest-dom/extend-expect';

import Button from '../Button';

describe('<Button />', (): void => {
  afterEach(cleanup);

  const children: ReactChild = 'Button';

  it('should render a children', (): void => {
    const { getByRole } = renderWithRouter(<Button>{children}</Button>);

    expect(getByRole('button')).toHaveTextContent(children);
  });

  it('should render a disabled button if disabled prop is true', (): void => {
    const { getByRole } = renderWithRouter(<Button disabled>{children}</Button>);

    expect(getByRole('button')).toHaveAttribute('disabled');
  });

  it('should call onClick event', (): void => {
    const onClick = jest.fn();
    const { getByRole } = renderWithRouter(<Button onClick={onClick}>{children}</Button>);

    fireEvent.click(getByRole('button'));

    expect(onClick).toHaveBeenCalled();
  });

  it('should not call events if disabled prop is true', (): void => {
    const onClick = jest.fn();
    const { getByRole } = renderWithRouter(<Button onClick={onClick} disabled>{children}</Button>);

    fireEvent.click(getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should rerender correctly', (): void => {
    const loading = 'Loading...';
    const { rerender, getByRole } = renderWithRouter(<Button>{children}</Button>);

    expect(getByRole('button')).toHaveTextContent(children);

    rerender(<Button disabled>{loading}</Button>);

    expect(getByRole('button')).toHaveTextContent(loading);
    expect(getByRole('button')).toHaveAttribute('disabled');
  });

  it('should render Link if to prop is true', (): void => {
    const { getByRole } = renderWithRouter(<Button to="/">{children}</Button>);

    expect(getByRole('link')).toHaveTextContent(children);
  });

  it('should render and match the snapshot', (): void => {
    const defaultButton = renderWithRouter(<Button>{children}</Button>);
    const disabledButton = renderWithRouter(<Button disabled>{children}</Button>);
    const LinkButton = renderWithRouter(<Button to="/">{children}</Button>);

    expect(defaultButton.container.firstChild).toMatchSnapshot();
    expect(disabledButton.container.firstChild).toMatchSnapshot();
    expect(LinkButton.container.firstChild).toMatchSnapshot();
  });
});
