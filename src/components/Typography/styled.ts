/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { ThemeSet } from 'styled-theming';

import {
  TEXT_PRIMARY,
  PRIMARY,
  DANGER,
  TEXT_SECONDARY,
} from '../../design/colors';
import * as typo from '../../design/typo';

type TypoVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'overline';

type TypoAlign = 'inherit' | 'left' | 'center' | 'right' | 'justify';
type TypoColors = 'initial' | 'inherit' | 'primary' | 'textPrimary' | 'textSecondary' | 'error';

interface TypoProps {
  align: TypoAlign;
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  variant?: TypoVariant;
  variantMapping?: Partial<Record<TypoVariant, string>>;
  color?: TypoColors;
  display: 'initial' | 'block' | 'inline';
}

export const Typo = styled.span<TypoProps>`
  margin: 0;

  color: ${({ color = 'initial' }): ThemeSet | TypoColors => (
    (color === 'primary' && PRIMARY)
    || (color === 'error' && DANGER)
    || (color === 'textPrimary' && TEXT_PRIMARY)
    || (color === 'textSecondary' && TEXT_SECONDARY)
    || color
  )};

  ${({ display }): string | false => display !== 'initial' && `
    display: ${display};
  `};

  text-align: ${({ align }): TypoAlign => align};

  ${({ noWrap }): string | undefined | false => noWrap && `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}

  ${({ gutterBottom }): string | undefined | false => gutterBottom && `
    margin-bottom: 0.35em;
  `}

  ${({ paragraph }): string | undefined | false => paragraph && `
    margin-bottom: 16px;
  `}

  ${({ variant = 'body1' }): string => typo[variant]}
`;
