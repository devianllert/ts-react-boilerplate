import React from 'react';
import { render, screen } from '@testing-library/react';


import TextField from '../TextField';

describe('<TextField />', () => {
  it('should have an input as the only child', () => {
    render(<TextField />);

    expect(screen.getAllByRole('textbox')).toHaveLength(1);
  });

  it('should forward the fullWidth prop to Input', () => {
    render(<TextField fullWidth />);

    expect(screen.getByRole('textbox').parentElement).toHaveStyleRule('width', '100%');
  });

  it('label the input', () => {
    render(<TextField id="labelled" label="Foo bar" />);

    expect(screen.getByLabelText('Foo bar')).toBeDefined();
  });

  it('helper text the input', () => {
    render(<TextField id="labelled" helperText="Foo bar" />);

    expect(screen.getByText('Foo bar')).toBeDefined();
    expect(screen.getByText('Foo bar').tagName).toBe('P');
  });
});
