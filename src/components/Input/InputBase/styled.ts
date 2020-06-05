import styled from 'styled-components';
import { ThemeSet } from 'styled-theming';

import { body1 } from '../../../design/typo';
import { TEXT_PRIMARY, TEXT_DISABLED } from '../../../design/colors';
import { spacings } from '../../../design/spacings';

interface InputWrapperProps {
  fullWidth: boolean;
  disabled: boolean;
  startAdornment: boolean;
  endAdornment: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;

  box-sizing: border-box;

  display: inline-flex;
  align-items: center;

  ${body1}

  width: ${({ fullWidth }): string => (fullWidth ? '100%' : 'auto')};

  color: ${({ disabled }): ThemeSet => (disabled ? TEXT_DISABLED : TEXT_PRIMARY)};

  line-height: 1.1876em;

  cursor: ${({ disabled }): string => (disabled ? 'default' : 'text')};

  padding-left: ${({ startAdornment }): string => (startAdornment ? spacings[1] : '0')};
  padding-right: ${({ endAdornment }): string => (endAdornment ? spacings[1] : '0')};
`;

export const InputBase = styled.input`
  box-sizing: content-box;

  display: block;

  font: inherit;

  background: none;
  color: currentColor;

  padding: 6px 0;
  margin: 0;

  border: 0;

  height: 20px;
  min-width: 0;
  width: 100%;

  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: 0;
  }

  &:invalid {
    box-shadow: none;
  }

  &[disabled] {
    opacity: 1;
  }
`;
