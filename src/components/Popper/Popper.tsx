import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import PopperJS, {
  ReferenceObject,
  PopperOptions,
  Data,
  Placement,
} from 'popper.js';

import Portal from '../Portal';

interface ChildProps {
  placement: Placement;
  TransitionProps?: object;
}

interface Props {
  anchorEl?: null | ReferenceObject | (() => ReferenceObject);
  children: ReactNode | ((props: ChildProps) => ReactNode);
  container?: Element;
  disablePortal?: boolean;
  keepMounted?: boolean;
  modifiers?: object;
  open: boolean;
  placement?: Placement;
  popperOptions?: PopperOptions;
  popperRef?: Ref<PopperJS>;
  transition?: boolean;
}

function getAnchorEl(anchorEl: null | ReferenceObject | (() => ReferenceObject)): null | ReferenceObject {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const Popper = (props: Props): ReactElement | null => {
  const {
    anchorEl,
    children,
    container,
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement: initialPlacement = 'bottom',
    popperOptions = {},
    popperRef: popperRefProp,
    transition = false,
    ...other
  } = props;

  const tooltipRef = useRef<Element>();
  const popperRef = useRef<PopperJS>();

  const [exited, setExited] = useState(true);

  const [placement, setPlacement] = useState(initialPlacement);

  const handleOpen = useCallback(() => {
    if (!tooltipRef.current || !anchorEl || !open) {
      return;
    }

    if (popperRef.current) {
      popperRef.current.destroy();
      popperRef.current = undefined;
    }

    const handlePopperUpdate = (data: Data): void => {
      setPlacement(data.placement);
    };

    const popper = new PopperJS(getAnchorEl(anchorEl) as ReferenceObject, tooltipRef.current, {
      placement,
      ...popperOptions,
      modifiers: {
        ...(disablePortal
          ? {}
          : {
            // It's using scrollParent by default, we can use the viewport when using a portal.
            preventOverflow: {
              boundariesElement: 'window',
            },
          }),
        ...modifiers,
        ...popperOptions.modifiers,
      },
      // We could have been using a custom modifier like react-popper is doing.
      // But it seems this is the best public API for this use case.
      onCreate: (data: Data): void => {
        handlePopperUpdate(data);

        if (popperOptions.onCreate) {
          popperOptions.onCreate(data);
        }
      },
      onUpdate: (data: Data): void => {
        handlePopperUpdate(data);

        if (popperOptions.onUpdate) {
          popperOptions.onUpdate(data);
        }
      },
    });

    popperRef.current = popper;
  }, [anchorEl, disablePortal, modifiers, open, placement, popperOptions]);

  const handleRef = React.useCallback((node) => {
    tooltipRef.current = node;

    handleOpen();
  }, [tooltipRef, handleOpen]);

  const handleEnter = (): void => {
    setExited(false);
  };

  const handleClose = (): void => {
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
    popperRef.current = undefined;
  };

  const handleExited = (): void => {
    setExited(true);

    handleClose();
  };

  // Let's update the popper position.
  useEffect(() => handleOpen(), [handleOpen]);

  useEffect(() => handleClose, []);

  useEffect(() => {
    if (!open && !transition) {
      // Otherwise handleExited will call this.
      handleClose();
    }
  }, [open, transition]);

  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }

  const childProps: ChildProps = { placement };

  if (transition) {
    childProps.TransitionProps = {
      in: open,
      onEnter: handleEnter,
      onExited: handleExited,
    };
  }

  return (
    <Portal disablePortal={disablePortal} container={container}>
      <div
        ref={handleRef}
        role="tooltip"
        style={{
          position: 'fixed',
        }}
        {...other} // eslint-disable-line
      >
        {typeof children === 'function' ? children(childProps) : children}
      </div>
    </Portal>
  );
};

export default Popper;
