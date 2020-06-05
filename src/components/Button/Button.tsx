import React, { ReactNode, ReactElement, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'react-essential-tools';

import * as S from './styled';

interface Props extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  /**
   * The content of the button.
   */
  children: ReactNode;
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  to?: string;
  /**
   * If `true`, the base button will be disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the base button will have loading indicator.
   */
  loading?: boolean;
  /**
   * If `true`, the button will take up the full width of its container.
   */
  fullWidth?: boolean;
  /**
   * Element placed before the children.
   */
  startIcon?: ReactNode;
  /**
   * Element placed after the children.
   */
  endIcon?: ReactNode;
  type?: 'submit' | 'button' | 'reset';
  /**
   * The variant to use.
   */
  variant?: 'text' | 'outlined' | 'contained';
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  appearence?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  /**
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   */
  size?: 'small' | 'medium' | 'large';
}

const Button = (props: Props): ReactElement => {
  const {
    children,
    to,
    disabled,
    loading,
    startIcon: startIconProp,
    endIcon: endIconProp,
    type = 'button',
    appearence = 'primary',
    ...otherProps
  } = props;

  const startIcon = startIconProp && <S.StartIcon>{startIconProp}</S.StartIcon>;
  const endIcon = endIconProp && <S.EndIcon>{endIconProp}</S.EndIcon>;

  const content = loading ? (
    <CircularProgress size={24} />
  ) : (
    <S.Label>
      {startIcon}
      {children}
      {endIcon}
    </S.Label>
  );

  if (to && !disabled) {
    return (
      <S.BaseButton
        as={Link}
        appearence={appearence}
        to={to}
        {...otherProps} // eslint-disable-line
      >
        {content}
      </S.BaseButton>
    );
  }

  return (
    <S.BaseButton
      appearence={appearence}
      type={type}
      disabled={disabled}
      {...otherProps} // eslint-disable-line
    >
      {content}
    </S.BaseButton>
  );
};

export default Button;
