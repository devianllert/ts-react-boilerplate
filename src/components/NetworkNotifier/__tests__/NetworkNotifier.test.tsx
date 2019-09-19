import React, { ReactElement } from 'react';
import { cleanup, render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import NetworkNotifier from '../NetworkNotifier';

jest.mock('react-transition-group', (): any => {
  const FakeTransition = jest.fn(({ children }): any => children);

  const FakeCSSTransition = jest.fn(
    (props: any): ReactElement | null => <FakeTransition>{props.children}</FakeTransition>,
  );

  return { CSSTransition: FakeCSSTransition, Transition: FakeTransition };
});

describe('<NetworkNotifier />', (): void => {
  afterEach(cleanup);

  it('should render and match the snapshot', (): void => {
    const LinkButton = render(<NetworkNotifier />);

    expect(LinkButton.container.firstChild).toMatchSnapshot();
  });
});
