import theme, { ThemeSet } from 'styled-theming';

export const createColor = (light: string, dark?: string): ThemeSet => theme('mode', {
  light,
  dark: dark || light,
});

export const PRIMARY = createColor('#6556FB');

export const WARNING = createColor('#FFC608');

export const DANGER = createColor('#F7467D');

export const SUCCESS = createColor('#28BBA6');

export const INFO = createColor('#28BBD9');

export const GREY = createColor('#fafafa', '#9e9e9e');

export const BACKGROUND = createColor('#FAFBFC', '#121212');

export const BACKGROUND_SECONDARY = createColor('#FAFBFC', '#1E1E1E');

export const TEXT_PRIMARY = createColor('rgba(0, 0, 0, 0.87)', 'rgba(255, 255, 255, 0.87)');

export const TEXT_SECONDARY = createColor('rgba(0, 0, 0, 0.60)', 'rgba(255, 255, 255, 0.60)');

export const TEXT_DISABLED = createColor('rgba(0, 0, 0, 0.38)', 'rgba(255, 255, 255, 0.38)');

export const DIVIDER_COLOR = createColor('rgba(0, 0, 0, 0.12)', 'rgba(255, 255, 255, 0.12)');

export const PAPER_COLOR = createColor('#ffffff', '#9e9e9e');
