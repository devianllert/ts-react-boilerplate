import React, { ReactChild, ReactElement } from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

interface Props {
  disabled?: boolean;
  children: ReactChild | ReactChild[];
}

const Button = (props: Props): ReactElement => {
  const { disabled, children } = props;

  const classes = classnames(
    styles.button,
    disabled && styles.disabled,
  );

  return (
    <button
      className={classes}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
