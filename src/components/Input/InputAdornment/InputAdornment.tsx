import React, {
  ReactElement,
  ReactNode,
  HTMLAttributes,
} from 'react';

import Typography from '../../Typography';

import * as S from './styled';

interface InputAdornmentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children: ReactNode;
  /**
   * Disable pointer events on the root.
   * This allows for the content of the adornment to focus the input on click.
   */
  disablePointerEvents?: boolean;
  /**
   * If children is a string then disable wrapping in a Typography component.
   */
  disableTypography?: boolean;
  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: 'start' | 'end';
  /**
   * The variant to use.
   */
  variant?: 'standard' | 'outlined' | 'filled';
}

const InputAdornment = (props: InputAdornmentProps): ReactElement => {
  const {
    children,
    className,
    disablePointerEvents = false,
    disableTypography = false,
    position,
    variant,
    ...other
  } = props;

  return (
    <S.Adornment
      variant={variant}
      position={position}
      disablePointerEvents={disablePointerEvents}
      className={className}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {typeof children === 'string' && !disableTypography ? (
        <Typography color="textSecondary">{children}</Typography>
      ) : (
        children
      )}
    </S.Adornment>
  );
};

export default InputAdornment;
