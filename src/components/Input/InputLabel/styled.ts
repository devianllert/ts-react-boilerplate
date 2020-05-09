/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

import { body2 } from '../../../design/typo';
import {
  TEXT_SECONDARY,
  PRIMARY,
  TEXT_DISABLED,
  DANGER,
} from '../../../design/colors';
import { spacings } from '../../../design/spacings';

interface LabelProps {
  disabled?: boolean;
  error?: boolean;
  filled?: boolean;
  focused?: boolean;
  required?: boolean;
}

export const Label = styled.label<LabelProps>`
    ${body2}
    color: ${TEXT_SECONDARY};
    line-height: 1;
    padding: 0;

    margin-bottom: ${spacings[1]};

    ${({ focused }) => focused && css`
      color: ${PRIMARY};
    `}

    ${({ disabled }) => disabled && css`
      color: ${TEXT_DISABLED};
    `}

    ${({ error }) => error && css`
      color: ${DANGER};
    `}
`;

export const Asterisk = styled.span<{ error?: boolean }>`
  ${({ error }) => error && css`
    color: ${DANGER}
  `}
`;
