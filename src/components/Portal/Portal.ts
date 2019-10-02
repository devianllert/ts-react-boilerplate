import React, { useState, ReactPortal, ReactElement } from 'react';
import { createPortal } from 'react-dom';

import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';

interface Props {
  children: ReactElement;
  container?: Element;
  disablePortal?: boolean;
}

const Portal = (props: Props): ReactPortal | ReactElement | null => {
  const {
    children,
    container,
    disablePortal = false,
  } = props;

  const [mountNode, setMountNode] = useState<Element | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!disablePortal) {
      setMountNode(container || document.body);
    }
  }, [container, disablePortal]);

  if (disablePortal) {
    React.Children.only(children);

    return children;
  }

  return mountNode ? createPortal(children, mountNode) : mountNode;
};

export default Portal;
