export type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla';

interface DecomposedColor {
  type: ColorFormat;
  values: number[];
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
const clamp = (value: number, min = 0, max = 1): number => Math.min(Math.max(min, value), max);

/**
 * Converts a color from CSS hex format to CSS rgb format.
 *
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */
export const hexToRgb = (color: string): string => {
  const hex = color.substr(1);

  const re = new RegExp(`.{1,${hex.length / 3}}`, 'g');
  let colors = hex.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }

  return colors ? `rgb(${colors.map((n) => parseInt(n, 16)).join(', ')})` : '';
};

const intToHex = (int: number): string => {
  const hex = int.toString(16);

  return hex.length === 1 ? `0${hex}` : hex;
};

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {object} - A MUI color object: {type: string, values: number[]}
 */
export const decomposeColor = (color: string | DecomposedColor): DecomposedColor => {
  // Idempotent
  if (typeof color === 'object') {
    return color;
  }

  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker) as ColorFormat;

  const values = color
    .substring(marker + 1, color.length - 1)
    .split(',')
    .map((value) => parseFloat(value));

  return { type, values };
};

/**
 * Converts a color object with type and values to a string.
 *
 * @param {object} color - Decomposed color
 * @returns {string} A CSS color string
 */
export const recomposeColor = (color: DecomposedColor): string => {
  const { type, values } = color;

  let newValues: (number | string)[] = values;

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    newValues = values.map((n, i) => (i < 3 ? Math.trunc(n) : n));
  } else if (type.indexOf('hsl') !== -1) {
    newValues[1] = `${values[1]}%`;
    newValues[2] = `${values[2]}%`;
  }

  return `${type}(${newValues.join(', ')})`;
};

/**
 * Converts a color from CSS rgb format to CSS hex format.
 *
 * @param {string} color - RGB color, i.e. rgb(n, n, n)
 * @returns {string} A CSS rgb color string, i.e. #nnnnnn
 */
export const rgbToHex = (color: string): string => {
  // Idempotent
  if (color.indexOf('#') === 0) {
    return color;
  }

  const { values } = decomposeColor(color);
  return `#${values.map((n) => intToHex(n)).join('')}`;
};

/**
 * Converts a color from hsl format to rgb format.
 *
 * @param {string} color - HSL color values
 * @returns {string} rgb color values
 */
export const hslToRgb = (color: string | DecomposedColor): string => {
  const hsl = decomposeColor(color);

  const { values } = hsl;

  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12): number => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type = 'rgb';
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];

  if (hsl.type === 'hsla') {
    type += 'a';
    rgb.push(values[3]);
  }

  return recomposeColor({ type: (type as ColorFormat), values: rgb });
};

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */
export const getLuminance = (color: string): number => {
  const col = decomposeColor(color);

  let rgb = col.type === 'hsl' ? decomposeColor(hslToRgb(color)).values : col.values;
  rgb = rgb.map((val) => {
    const num = val / 255; // normalized
    return num <= 0.03928 ? num / 12.92 : ((num + 0.055) / 1.055) ** 2.4;
  });

  // Truncate at 3 digits
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
};

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */
export const getContrastRatio = (foreground: string, background: string): number => {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);

  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
};

export function getContrastText(background: string, dark: string, light: string, contrastThreshold = 3) {
  const contrastText = getContrastRatio(background, dark) >= contrastThreshold
    ? dark
    : light;

  return contrastText;
}

/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} value - value to set the alpha channel to in the range 0 -1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export const fade = (color: string, value: number): string => {
  const decolor = decomposeColor(color);

  if (decolor.type === 'rgb' || decolor.type === 'hsl') {
    decolor.type += 'a';
  }

  decolor.values[3] = clamp(value);

  return recomposeColor(decolor);
};

/**
 * Darkens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export const darken = (color: string, coefficient: number): string => {
  const decolor = decomposeColor(color);
  const coe = clamp(coefficient);

  if (decolor.type.indexOf('hsl') !== -1) {
    decolor.values[2] *= 1 - coe;
  } else if (decolor.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      decolor.values[i] *= 1 - coe;
    }
  }

  return recomposeColor(decolor);
};

/**
 * Lightens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export const lighten = (color: string, coefficient: number): string => {
  const decolor = decomposeColor(color);
  const coe = clamp(coefficient);

  if (decolor.type.indexOf('hsl') !== -1) {
    decolor.values[2] += (100 - decolor.values[2]) * coe;
  } else if (decolor.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      decolor.values[i] += (255 - decolor.values[i]) * coe;
    }
  }

  return recomposeColor(decolor);
};

/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export const emphasize = (color: string, coefficient = 0.15): string => (
  getLuminance(color) > 0.5
    ? darken(color, coefficient)
    : lighten(color, coefficient)
);
