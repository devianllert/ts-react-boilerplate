/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

import { caption } from '../../../design/typo';
import {
  TEXT_SECONDARY,
  TEXT_DISABLED,
  DANGER,
} from '../../../design/colors';
import { spacings } from '../../../design/spacings';

interface HelperProps {
  disabled?: boolean;
  error?: boolean;
  filled?: boolean;
  focused?: boolean;
  required?: boolean;
}

export const HelperText = styled.p<HelperProps>`
    ${caption}
    color: ${TEXT_SECONDARY};
    line-height: 1;
    padding: 0;
    text-align: left;

    margin: 0;
    margin-top: 4px;
    margin-left: ${spacings[2]};
    margin-right: ${spacings[2]};

    ${({ disabled }) => disabled && css`
      color: ${TEXT_DISABLED};
    `}

    ${({ error }) => error && css`
      color: ${DANGER};
    `}
`;
