import React, {
  ReactElement,
  ReactNode,
  ElementType,
  HTMLAttributes,
} from 'react';

import * as S from './styled';

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

interface Props extends HTMLAttributes<ElementType> {
  /**
   * The content of the button.
   */
  children?: ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: ElementType;
  /**
   * Set the text-align on the component.
   */
  align?: TypoAlign;
  /**
   * If `true`, the text will have a bottom margin.
   */
  gutterBottom?: boolean;
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   */
  noWrap?: boolean;
  /**
   * If `true`, the text will have a bottom margin.
   */
  paragraph?: boolean;
  /**
   * The variant to use.
   */
  variant?: TypoVariant;
  /**
   * The mapped variants.
   */
  variantMapping?: Partial<Record<TypoVariant, string>>;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'initial' | 'inherit' | 'primary' | 'textPrimary' | 'textSecondary' | 'error';
  /**
   * Controls the display type
   */
  display?: 'initial' | 'block' | 'inline';
}

const defaultVariantMapping: Record<TypoVariant, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  button: 'span',
  overline: 'span',
  body1: 'p',
  body2: 'p',
};

const Typography = (props: Props): ReactElement => {
  const {
    children,
    align = 'inherit',
    color = 'initial',
    display = 'initial',
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping,
    ...other
  } = props;

  const Component = component
  || (paragraph ? 'p' : variantMapping[variant])
  || 'span';

  return (
    <S.Typo
      as={Component as ElementType}
      className={className}
      align={align}
      color={color}
      display={display}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      paragraph={paragraph}
      variant={variant}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {children}
    </S.Typo>
  );
};

export default Typography;
