/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState,
  ComponentProps,
  ReactElement,
  ReactNode,
  FocusEvent,
} from 'react';

import InputBase from '../InputBase';
import InputLabel from '../InputLabel';
import InputHelperText from '../InputHelperText';

import * as S from './styled';

interface TextFieldProps {
  label?: ReactNode;
  helperText?: ReactNode;
  margin?: 'none' | 'dense' | 'normal';
}

type Props = TextFieldProps & ComponentProps<typeof InputBase>;

const TextField = (props: Props): ReactElement => {
  const {
    label,
    helperText,
    id,
    required,
    error,
    disabled,
    margin = 'none',
    onFocus,
    onBlur,
    ...other
  } = props;

  const [focused, setFocused] = useState(false);

  const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
    // Fix a bug with IE 11 where the focus/blur events are triggered
    // while the input is disabled.
    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onFocus) {
      onFocus(event);
    }

    setFocused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    if (onBlur) {
      onBlur(event);
    }

    setFocused(false);
  };

  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;

  return (
    <S.TextFieldWrapper
      fullWidth={other.fullWidth}
      margin={margin}
    >
      {label && (
        <InputLabel
          htmlFor={id}
          id={inputLabelId}
          required={required}
          error={error}
          disabled={disabled}
          focused={focused}
        >
          {label}
        </InputLabel>
      )}

      <S.StyledInput
        aria-describedby={helperTextId}
        id={id}
        required={required}
        error={error}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        focused={focused}
        {...other}
      />

      {helperText && (
        <InputHelperText
          id={helperTextId}
          focused={focused}
          error={error}
          disabled={disabled}
          required={required}
        >
          {helperText === ' ' ? <span>&#8203;</span> : helperText}
        </InputHelperText>
      )}
    </S.TextFieldWrapper>
  );
};

export default TextField;
