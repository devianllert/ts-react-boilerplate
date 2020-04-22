import theme, { ThemeSet } from 'styled-theming';

export const CONTRAST_THRESHOLD = 3;

export const light = {
  // The colors used to style the text.
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.60)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    primary: '#FAFBFC',
    secondary: '#FAFBFC',
    paper: '#ffffff',
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};

export const dark = {
  text: {
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.60)',
    disabled: 'rgba(255, 255, 255, 0.38)',
  },
  background: {
    primary: '#121212',
    secondary: '#1E1E1E',
    paper: '#9e9e9e',
  },
  action: {
    active: '#fff',
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
};

export const createColor = (lightColor: string, darkColor?: string): ThemeSet => theme('mode', {
  light: lightColor,
  dark: darkColor || lightColor,
});

export const PRIMARY = createColor('#6556FB');

export const WARNING = createColor('#FFC608');

export const DANGER = createColor('#F7467D');

export const SUCCESS = createColor('#28BBA6');

export const INFO = createColor('#28BBD9');

export const GREY = createColor('#fafafa', '#9e9e9e');

export const BACKGROUND = createColor(light.background.primary, dark.background.primary);

export const BACKGROUND_SECONDARY = createColor(light.background.secondary, dark.background.secondary);

export const TEXT_PRIMARY = createColor(light.text.primary, dark.text.primary);

export const TEXT_SECONDARY = createColor(light.text.secondary, dark.text.secondary);

export const TEXT_DISABLED = createColor(light.text.disabled, dark.text.disabled);

export const DIVIDER_COLOR = createColor('rgba(0, 0, 0, 0.12)', 'rgba(255, 255, 255, 0.12)');

export const PAPER_COLOR = createColor('#ffffff', '#9e9e9e');
