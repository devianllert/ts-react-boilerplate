import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MdArrowBack } from 'react-icons/md';

import Avatar from '../Avatar';

describe('<Avatar />', () => {
  afterEach(cleanup);

  it('should render a div containing an font icon', () => {
    const { container } = render(
      <Avatar className="my-avatar" data-my-prop="woofAvatar">
        <span className="my-icon-font">icon</span>
      </Avatar>,
    );

    const avatar = container.children[0];
    const icon = avatar.children[0];

    expect(avatar.tagName).toBe('DIV');
    expect(icon.tagName).toBe('SPAN');
    expect(icon).toHaveClass('my-icon-font');
    expect(icon).toHaveTextContent('icon');
  });

  it('should render a div containing an img, not children', () => {
    const { container } = render(<Avatar src="something.jpg">MB</Avatar>);

    const avatar = container.children[0];
    const img = avatar.children[0];

    expect(img.tagName).toBe('IMG');
    expect(avatar).toHaveTextContent('');
  });

  it('should be able to add more props to the image', () => {
    const onError = jest.fn();
    const { container } = render(<Avatar src="something.jpg" imgProps={{ onError }} />);
    const img = container.children[0].children[0];

    fireEvent.error(img);

    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('should merge user classes & spread custom props to the root node', () => {
    const { container } = render(
      <Avatar className="my-avatar" data-my-prop="woofAvatar">
        <span className="my-icon-font">icon</span>
      </Avatar>,
    );

    const avatar = container.children[0];

    expect(avatar).toHaveClass('my-avatar');
    expect(avatar).toHaveAttribute('data-my-prop', 'woofAvatar');
  });

  it('should render a div containing an svg icon', () => {
    const { container } = render(
      <Avatar className="my-avatar" data-my-prop="woofAvatar">
        <MdArrowBack data-testid="ArrowBack" />
      </Avatar>,
    );
    const avatar = container.children[0];
    const arrowIcon = avatar.children[0];

    expect(avatar.tagName).toBe('DIV');
    expect(arrowIcon).toHaveAttribute('data-testid', 'ArrowBack');
  });

  it('should render a div containing a string', () => {
    const { container } = render(
      <Avatar className="my-avatar" data-my-prop="woofAvatar">
        OT
      </Avatar>,
    );

    const avatar = container.children[0];

    expect(avatar.tagName).toBe('DIV');
    expect(avatar).toHaveTextContent('OT');
  });
});
