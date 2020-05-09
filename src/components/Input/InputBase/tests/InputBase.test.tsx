import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputBase from '../InputBase';
import InputAdornment from '../../InputAdornment';

describe('<InputBase />', () => {
  it('should render an <input /> inside the div', () => {
    render(<InputBase />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('type', 'text');
    expect(input).not.toBeRequired();
    expect(input).toHaveStyleRule('height', '20px');
  });

  it('should render a disabled <input />', () => {
    render(<InputBase disabled />);

    const input = screen.getByRole('textbox');
    const wrapper = input.parentElement;

    expect(wrapper).toHaveStyleRule('cursor', 'default');
    expect(input).toBeDisabled();
  });

  it('should reset the focused state if getting disabled', () => {
    const handleBlur = jest.fn();
    const handleFocus = jest.fn();

    const { rerender } = render(
      <InputBase onBlur={handleBlur} onFocus={handleFocus} />,
    );

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);

    rerender(
      <InputBase onBlur={handleBlur} onFocus={handleFocus} disabled />,
    );

    // check if focus not initiated again
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should fire event callbacks', () => {
    const handleChange = jest.fn();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const handleKeyUp = jest.fn();
    const handleKeyDown = jest.fn();

    render(
      <InputBase
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      />,
    );
    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(input, { key: 'a' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.keyUp(input, { key: 'a' });
    expect(handleKeyUp).toHaveBeenCalledTimes(1);

    userEvent.type(input, 'a');
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleKeyDown).toHaveBeenCalledTimes(2);
    expect(handleKeyUp).toHaveBeenCalledTimes(2);

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should have the aria-required prop with value true', () => {
    render(<InputBase required />);

    const input = screen.getByRole('textbox');

    expect(input).toBeRequired();
  });

  it('should render adornment before input', () => {
    render(
      <InputBase
        startAdornment={(
          <InputAdornment data-testid="adornment" position="start">
            $
          </InputAdornment>
        )}
      />,
    );

    expect(screen.getByTestId('adornment')).toBeDefined();
  });

  it('should render adornment after input', () => {
    render(
      <InputBase
        endAdornment={(
          <InputAdornment data-testid="adornment" position="end">
            $
          </InputAdornment>
        )}
      />,
    );

    expect(screen.getByTestId('adornment')).toBeDefined();
  });
});
