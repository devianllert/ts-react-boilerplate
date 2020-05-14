import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Grid from '../Grid';

describe('<Grid />', () => {
  it('should apply the container styles', () => {
    render(<Grid container data-testid="grid-container">child</Grid>);

    const container = screen.getByTestId('grid-container');

    expect(container).toHaveStyleRule('box-sizing', 'border-box');
    expect(container).toHaveStyleRule('display', 'flex');
    expect(container).toHaveStyleRule('box-sizing', 'border-box');
    expect(container).toHaveStyleRule('flex-wrap', 'wrap');
  });

  it('should apply the item styles', () => {
    render(<Grid item data-testid="grid-item">child</Grid>);

    const container = screen.getByTestId('grid-item');

    expect(container).toHaveStyleRule('box-sizing', 'border-box');
    expect(container).toHaveStyleRule('margin', '0');
  });

  it('should have a spacing', () => {
    render(<Grid container spacing={1} data-testid="grid-container">child</Grid>);

    expect(screen.getByTestId('grid-container')).toHaveStyleRule('margin', '-4px');
  });

  it('should apply the align-content style', () => {
    render(<Grid container alignContent="center" data-testid="grid-container">child</Grid>);

    expect(screen.getByTestId('grid-container')).toHaveStyleRule('align-content', 'center');
  });

  it('should apply the justify style', () => {
    render(<Grid container justify="space-evenly" data-testid="grid-container">child</Grid>);

    expect(screen.getByTestId('grid-container')).toHaveStyleRule('justify-content', 'space-evenly');
  });

  describe('prop: mobile', () => {
    it('should apply the flex-grow style', () => {
      render(<Grid item mobile data-testid="grid-container">child</Grid>);

      expect(screen.getByTestId('grid-container')).toHaveStyleRule('flex-basis', '0');
      expect(screen.getByTestId('grid-container')).toHaveStyleRule('flex-grow', '1');
      expect(screen.getByTestId('grid-container')).toHaveStyleRule('max-width', '100%');
    });

    it('should apply the flex auto style', () => {
      render(<Grid item mobile="auto" data-testid="grid-container">child</Grid>);

      expect(screen.getByTestId('grid-container')).toHaveStyleRule('flex-basis', 'auto');
      expect(screen.getByTestId('grid-container')).toHaveStyleRule('flex-grow', '0');
      expect(screen.getByTestId('grid-container')).toHaveStyleRule('max-width', 'none');
    });

    it('should apply the flex size style', () => {
      render(<Grid item mobile={3} data-testid="grid-container">child</Grid>);

      expect(screen.getByTestId('grid-container'))
        .toHaveStyleRule('flex-basis', `${Math.round((3 / 12) * 10e7) / 10e5}%`);
      expect(screen.getByTestId('grid-container'))
        .toHaveStyleRule('flex-grow', '0');
      expect(screen.getByTestId('grid-container'))
        .toHaveStyleRule('max-width', `${Math.round((3 / 12) * 10e7) / 10e5}%`);
    });
  });

  it('should spread the other props to the root element', () => {
    const handleClick = jest.fn();

    render(<Grid onClick={handleClick} data-testid="grid-container">child</Grid>);

    userEvent.click(screen.getByTestId('grid-container'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
