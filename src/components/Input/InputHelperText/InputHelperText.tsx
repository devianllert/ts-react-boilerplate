import React, {
  ReactElement,
  ReactNode,
  HTMLAttributes,
} from 'react';

import * as S from './styled';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * The content of the component.
   */
  children: ReactNode;
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * If `true`, the helper text should be displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled?: boolean;
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused?: boolean;
  /**
   * If `true`, the helper text should use required classes key.
   */
  required?: boolean;
}

const InputHelperText = (props: Props): ReactElement => {
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
    <S.HelperText
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
    </S.HelperText>
  );
};

export default InputHelperText;
