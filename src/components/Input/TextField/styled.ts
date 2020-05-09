/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

import InputBase from '../InputBase';

import { spacings } from '../../../design/spacings';
import { createTransition } from '../../../design/transitions';
import {
  DANGER,
  PRIMARY,
  TEXT_SECONDARY,
  TEXT_DISABLED,
} from '../../../design/colors';

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

  border: 2px solid ${TEXT_SECONDARY};
  border-radius: 4px;

  ${({ focused }) => focused && css`
    border: 2px solid ${PRIMARY};
  `}

  ${({ error }) => error && css`border: 2px solid ${DANGER}`};

  ${({ disabled }) => disabled && css`border: 2px solid ${TEXT_DISABLED}`};

  transition: ${createTransition('border-color')};
`;
