import React, {
  ReactChild,
  ReactElement,
  MouseEvent,
  HTMLAttributes,
  forwardRef,
  Ref,
} from 'react';
import classnames from 'classnames';

import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

interface Props extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children: ReactChild | ReactChild[] | any; // eslint-disable-line
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  to?: string;
  disabled?: boolean;
  outlined?: boolean;
  flat?: boolean;
  type?: 'submit' | 'button' | 'reset';
  appearence?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'small' | 'medium' | 'large';
}

const Button = forwardRef((props: Props, ref: Ref<any>): ReactElement => {
  const {
    children,
    onClick,
    to,
    disabled,
    outlined,
    flat,
    type = 'button',
    appearence = 'primary',
    size = 'medium',
    ...otherProps
  } = props;

  const classes = classnames(
    styles.button,
    styles[appearence],
    styles[size],
    disabled && styles.disabled,
    outlined && styles.outlined,
    flat && styles.flat,
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
    if (!onClick) return;

    onClick(event);
  };

  if (to && !disabled) {
    return (
      <Link
        to={to}
        onClick={handleClick}
        className={classes}
        ref={ref}
        {...otherProps} // eslint-disable-line
      >
        {children}
      </Link>
    );
  }

  return (
    <button // eslint-disable-line react/button-has-type
      onClick={handleClick}
      className={classes}
      type={type}
      disabled={disabled}
      ref={ref}
      {...otherProps} // eslint-disable-line
    >
      {children}
    </button>
  );
});

export default Button;
