import React, { ReactChild } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import Typography from '../Typography';

describe('<Typography />', () => {
  afterEach(cleanup);

  const children: ReactChild = 'Typography';

  it('should render a children', () => {
    const { getByText } = render(<Typography>{children}</Typography>);

    expect(getByText(children)).toBeDefined();
    expect(getByText(children).tagName).toBe('P');
  });

  it('should render a h1', () => {
    const { getByText } = render(<Typography variant="h1">{children}</Typography>);

    expect(getByText(children).tagName).toBe('H1');
  });

  it('should render a h2', () => {
    const { getByText } = render(<Typography variant="h2">{children}</Typography>);

    expect(getByText(children).tagName).toBe('H2');
  });

  it('should render a h3', () => {
    const { getByText } = render(<Typography variant="h3">{children}</Typography>);

    expect(getByText(children).tagName).toBe('H3');
  });

  it('should render a h4', () => {
    const { getByText } = render(<Typography variant="h4">{children}</Typography>);

    expect(getByText(children).tagName).toBe('H4');
  });

  it('should render a h5', () => {
    const { getByText } = render(<Typography variant="h5">{children}</Typography>);

    expect(getByText(children).tagName).toBe('H5');
  });

  it('should render a h6', () => {
    const { getByText } = render(<Typography variant="h6">{children}</Typography>);

    expect(getByText(children).tagName).toBe('H6');
  });

  it('should render a chosen tag', () => {
    const { getByText } = render(<Typography component="h1" variant="h6">{children}</Typography>);

    expect(getByText(children).tagName).toBe('H1');
  });

  it('should center text', () => {
    const { getByText } = render(<Typography align="center">{children}</Typography>);

    expect(getByText(children)).toHaveStyleRule('text-align', 'center');
  });

  it('should set display initial', () => {
    const { getByText } = render(<Typography display="initial">{children}</Typography>);

    expect(getByText(children)).not.toHaveStyleRule('display');
  });

  it('should set display inline', () => {
    const { getByText } = render(<Typography display="inline">{children}</Typography>);

    expect(getByText(children)).toHaveStyleRule('display', 'inline');
  });

  it('should set display block', () => {
    const { getByText } = render(<Typography display="block">{children}</Typography>);

    expect(getByText(children)).toHaveStyleRule('display', 'block');
  });

  it('should render a p with a paragraph', () => {
    const { getByText } = render(<Typography paragraph>{children}</Typography>);

    expect(getByText(children).tagName).toBe('P');
  });

  it('should work with a single value', () => {
    const { getByText } = render(<Typography variant="h6" variantMapping={{ h6: 'aside' }}>{children}</Typography>);

    expect(getByText(children).tagName).toBe('ASIDE');
  });
});
