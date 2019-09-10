import React, { ReactChild, ReactElement, MouseEvent } from 'react';
import classnames from 'classnames';

import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

interface Props {
  to?: string;
  onClick?: Function;
  disabled?: boolean;
  children: ReactChild | ReactChild[];
}

const Button = (props: Props): ReactElement => {
  const {
    to,
    onClick,
    disabled,
    children,
  } = props;

  const classes = classnames(
    styles.button,
    disabled && styles.disabled,
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
    <button
      onClick={handleClick}
      className={classes}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
