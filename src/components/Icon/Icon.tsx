import React, { cloneElement, ReactElement } from 'react';

import BaseIcon from './BaseIcon';

interface Props {
  children: ReactElement;
  size?: number;
  fill?: string;
  className?: string;
}

const Icon = (props: Props): ReactElement => {
  const {
    children,
    size = 16,
    fill = 'currentColor',
    className,
  } = props;

  const svgProps = {
    width: size,
    height: size,
    fill,
    'aria-hidden': 'true',
    focusable: 'false',
  };

  return (
    <BaseIcon size={size} className={className}>
      {cloneElement(children, svgProps)}
    </BaseIcon>
  );
};

export default Icon;
