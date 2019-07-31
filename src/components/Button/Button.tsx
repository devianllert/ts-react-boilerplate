import React, { ReactChild, ReactElement, MouseEvent } from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

interface Props {
  onClick?: Function;
  disabled?: boolean;
  children: ReactChild | ReactChild[];
}

const Button = (props: Props): ReactElement => {
  const { onClick, disabled, children } = props;

  const classes = classnames(
    styles.button,
    disabled && styles.disabled,
  );

  const handleClick = (event: MouseEvent): void => {
    if (!onClick) return;

    onClick(event);
  };

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
