/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

import InputBase from '../InputBase';

import { spacings } from '../../../design/spacings';
import { createTransition, duration } from '../../../design/transitions';
import { DANGER, PRIMARY, TEXT_DISABLED } from '../../../design/colors';
import grey from '../../../design/palette/grey';

interface TextFieldWrapperProps {
  fullWidth?: boolean;
  margin: 'none' | 'dense' | 'normal';
}

export const TextFieldWrapper = styled.div<TextFieldWrapperProps>`
  position: relative;

  display: inline-flex;
  flex-direction: column;

  width: ${({ fullWidth }): string => (fullWidth ? '100%' : 'auto')};
  min-width: 0;

  padding: 0;
  margin: 0;
  margin-top: ${({ margin }): string | false => (
    (margin === 'dense' && '8px')
    || (margin === 'normal' && '16px')
  )};
  margin-bottom: ${({ margin }): string | false => (
    (margin === 'dense' && '4px')
    || (margin === 'normal' && '8px')
  )};

  border: 0;

  vertical-align: top;
`;

export const StyledInput = styled(InputBase)<{ focused?: boolean }>`
  padding: 0 ${spacings[1]};

  border: 2px solid ${grey[500]};
  border-radius: 4px;

  ${({ error, focused, disabled }) => !(error || focused || disabled) && `
    &:hover {
      border-color: ${grey[600]}
    }
  `}

  ${({ focused }) => focused && css`
    border-color: ${PRIMARY};
  `}

  ${({ error }) => error && css`border-color: ${DANGER}`};

  ${({ disabled }) => disabled && css`border-color: ${TEXT_DISABLED}`};

  transition: ${createTransition('border-color', { duration: duration.short })};
`;
