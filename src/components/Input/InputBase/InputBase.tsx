import React, { ReactElement, InputHTMLAttributes } from 'react';

import * as S from './styled';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it
   * [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete?: string;
  /**
   * If `true`, the `input` element will be focused during the first mount.
   */
  autoFocus?: boolean;
  /**
   * If `true`, the `input` element will be disabled.
   */
  disabled?: boolean;
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment?: React.ReactNode;
  /**
   * If `true`, the input will indicate an error. This is normally obtained via context from
   * FormControl.
   */
  error?: boolean;
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth?: boolean;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder?: string;
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly?: boolean;
  /**
   * If `true`, the `input` element will be required.
   */
  required?: boolean;
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment?: React.ReactNode;
}

const InputBase = (props: Props): ReactElement => {
  const {
    'aria-describedby': ariaDescribedby,
    autoComplete,
    autoFocus,
    className,
    defaultValue,
    disabled,
    error,
    fullWidth = false,
    id,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    inputRef,
    readOnly,
    required,
    startAdornment,
    endAdornment,
    type = 'text',
    value,
    ...other
  } = props;

  return (
    <S.InputWrapper
      disabled={!!disabled}
      fullWidth={fullWidth}
      className={className}
      startAdornment={!!startAdornment}
      endAdornment={!!endAdornment}
    >
      {startAdornment}

      <S.InputBase
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        aria-invalid={error}
        aria-describedby={ariaDescribedby}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
        ref={inputRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
      />

      {endAdornment}
    </S.InputWrapper>
  );
};

export default InputBase;
