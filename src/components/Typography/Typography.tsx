import React, {
  ReactElement,
  ReactNode,
  ElementType,
  HTMLAttributes,
} from 'react';
import styled from 'styled-components';

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

const Typo = styled.span<Props>`
  margin: 0;

  text-align: ${({ align = 'inherit' }): TypoAlign => align};

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

const Typography = (props: Props): ReactElement => {
  const {
    children,
    align = 'inherit',
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
    <Typo
      as={Component as ElementType<any>}
      className={className}
      align={align}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      paragraph={paragraph}
      variant={variant}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {children}
    </Typo>
  );
};

export default Typography;
