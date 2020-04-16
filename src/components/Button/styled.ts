import styled from 'styled-components';
import theme, { ThemeSet } from 'styled-theming';

import {
  PRIMARY,
  SUCCESS,
  WARNING,
  DANGER,
} from '../../design/colors';
import { createTransition, duration } from '../../design/transitions';
import { shape } from '../../design/shape';
import { shadows } from '../../design/shadows';


interface BaseButtonProps {
  disabled?: boolean;
  loading?: boolean;
  outlined?: boolean;
  fullWidth?: boolean;
  flat?: boolean;
  appearence?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'small' | 'medium' | 'large';
}

const BUTTON_BACKGROUNDS: Record<string, ThemeSet> = {
  primary: PRIMARY,
  success: SUCCESS,
  warning: WARNING,
  danger: DANGER,
};

const DISABLED_COLOR = theme('mode', {
  light: 'rgba(0, 0, 0, 0.3)',
  dark: 'rgba(255, 255, 255, 0.3)',
});

const DISABLED_BACKGROUND_COLOR = theme('mode', {
  light: 'rgba(0, 0, 0, 0.12)',
  dark: 'rgba(255, 255, 255, 0.12)',
});

export const BaseButton = styled.button<BaseButtonProps>`
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ fullWidth }): string => (fullWidth ? '100%' : 'auto')};
  min-width: 88px;
  height: 36px;

  padding: 0 16px;

  text-align: center;
  vertical-align: middle;

  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;

  letter-spacing: 1px;

  border: 0;
  border-radius: ${shape.borderRadius}px;

  color: #fff;
  background-color: ${({ appearence = 'primary' }): ThemeSet => BUTTON_BACKGROUNDS[appearence]};

  box-shadow: ${shadows[1]};

  text-decoration: none;
  text-transform: uppercase;

  -webkit-tap-highlight-color: transparent;

  outline: 0;

  appearance: none;

  touch-action: manipulation;
  user-select: none;
  cursor: pointer;

  transition: ${createTransition(['background-color', 'box-shadow', 'border'], {
    duration: duration.short,
  })};

  &:before {
    content: '';

    position: absolute;

    top:0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: transparent;

    transition: ${createTransition('background-color', { duration: duration.short })};

    user-select: none;
    pointer-events: none;
  }

  &:hover:before {
    background-color: rgba(255, 255, 255, 0.12);
  }

  &:focus:before {
    background-color: rgba(255, 255, 255, 0.18);
  }

  &:active:before {
    background-color: rgba(255, 255, 255, 0.24);
  }

  &:disabled {
    color: ${DISABLED_COLOR};
    background-color: ${DISABLED_BACKGROUND_COLOR};

    box-shadow: none;
  }
`;

export const Label = styled.span`
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
`;

export const EndIcon = styled.span`
  display: inherit;
  margin-right: -4px;
  margin-left: 8px;
`;

export const StartIcon = styled.span`
  display: inherit;
  margin-right: 8px;
  margin-left: -4px;
`;
