import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Paper from '../Paper';

import '@testing-library/jest-dom/extend-expect';

describe('<Paper />', () => {
  afterEach(cleanup);

  describe('prop: square', () => {
    it('should disable the rounded class when square prop is true', () => {
      const { container } = render(<Paper square>Hello World</Paper>);
      const firstChild = container.firstElementChild as Element;

      expect(firstChild).not.toHaveClass('rounded');
    });

    it('should add a rounded class to the root when omitted', () => {
      const { container } = render(<Paper>Hello World</Paper>);
      const firstChild = container.firstElementChild as Element;

      expect(firstChild).toHaveClass('rounded');
    });
  });

  it('should set the elevation elevation class', () => {
    const { container, rerender } = render(<Paper elevation={16}>Hello World</Paper>);
    const firstChild = container.firstElementChild as Element;

    expect(firstChild).toHaveClass('elevation16');

    rerender(<Paper elevation={24}>Hello World</Paper>);
    expect(firstChild).toHaveClass('elevation24');

    rerender(<Paper elevation={2}>Hello World</Paper>);
    expect(firstChild).toHaveClass('elevation2');
  });
});
