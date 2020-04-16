import React, {
  ReactElement,
  ReactNode,
  ElementType,
  HTMLAttributes,
} from 'react';
import styled from 'styled-components';

import * as typo from '../../design/typo';

type Variant =
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

interface Props extends HTMLAttributes<any> {
  children?: ReactNode;
  component?: ElementType;
  className?: string;
  align?: string;
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  variant?: Variant;
  variantMapping?: Partial<Record<Variant, string>>;
}

const defaultVariantMapping: Record<Variant, string> = {
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

  text-align: ${({ align }) => align};

  ${({ noWrap }) => noWrap && `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}

  ${({ gutterBottom }) => gutterBottom && `
    margin-bottom: 0.35em;
  `}

  ${({ paragraph }) => paragraph && `
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
