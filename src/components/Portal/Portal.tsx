import React, {
  cloneElement,
  forwardRef,
  useState,
  ReactPortal,
  ReactElement,
  ReactInstance,
  Ref,
} from 'react';
import { createPortal } from 'react-dom';

import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';

interface Props {
  children: ReactElement;
  container?: ReactInstance | (() => ReactInstance | null) | null;
  disablePortal?: boolean;
}

const Portal = (props: Props, ref: Ref<ReactInstance>): ReactPortal | ReactElement | null => {
  const {
    children,
    container,
    disablePortal = false,
  } = props;

  const [mountNode, setMountNode] = useState<ReactInstance | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!disablePortal) {
      setMountNode(container || document.body);
    }
  }, [container, disablePortal]);

  if (disablePortal) {
    React.Children.only(children);

    return cloneElement(children, { ref });
  }

  return mountNode ? createPortal(children, mountNode as Element) : mountNode;
};

export default forwardRef(Portal);
