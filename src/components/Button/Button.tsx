import React, { ReactChild, ReactElement, MouseEvent } from 'react';
import classnames from 'classnames';

import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

interface Props {
  children: ReactChild | ReactChild[] | any; // eslint-disable-line
  onClick?: Function;
  to?: string;
  disabled?: boolean;
  outlined?: boolean;
  flat?: boolean;
  type?: 'submit' | 'button' | 'reset';
  appearence?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'small' | 'medium' | 'large';
}

const Button = (props: Props): ReactElement => {
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
  } = props;

  const classes = classnames(
    styles.button,
    styles[appearence],
    styles[size],
    disabled && styles.disabled,
    outlined && styles.outlined,
    flat && styles.flat,
  );

  const handleClick = (event: MouseEvent): void => {
    if (!onClick) return;

    onClick(event);
  };

  if (to && !disabled) {
    return (
      <Link
        to={to}
        onClick={handleClick}
        className={classes}
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
    >
      {children}
    </button>
  );
};

export default Button;
