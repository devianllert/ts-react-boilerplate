import React, {
  ReactElement,
  ReactNode,
  LabelHTMLAttributes,
} from 'react';

import * as S from './styled';

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The content of the component.
   */
  children: ReactNode;
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the label should use filled classes key.
   */
  filled?: boolean;
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused?: boolean;
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required?: boolean;
}

const InputLabel = (props: InputLabelProps): ReactElement => {
  const {
    children,
    className,
    disabled,
    error,
    filled,
    focused,
    required,
    ...other
  } = props;

  return (
    <S.Label
      className={className}
      disabled={disabled}
      error={error}
      filled={filled}
      focused={focused}
      required={required}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {children}

      {required && (
        <S.Asterisk
          aria-hidden
          error={error}
        >
          &thinsp;*
        </S.Asterisk>
      )}
    </S.Label>
  );
};

export default InputLabel;
