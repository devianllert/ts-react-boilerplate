import React from 'react';
import { render, screen } from '@testing-library/react';

import InputAdornment from '../InputAdornment';

describe('<InputAdornment />', () => {
  it('should wrap text children in a Typography', () => {
    render(<InputAdornment position="start">foo</InputAdornment>);

    const typography = screen.getByText('foo');

    expect(typography).toHaveStyleRule('font-size', '1.6rem');
  });

  it('should have the disabled pointer events class when disabledPointerEvents true', () => {
    render(
      <InputAdornment disablePointerEvents position="start">
        foo
      </InputAdornment>,
    );
    const adornment = screen.getByText('foo').parentElement;

    expect(adornment).toHaveStyleRule('pointer-events', 'none');
  });
});
