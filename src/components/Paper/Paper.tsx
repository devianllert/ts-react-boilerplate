import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  ElementType,
} from 'react';
import classnames from 'classnames';

import styles from './Paper.module.scss';

interface Props {
  children: ReactNode;
  component?: ElementType;
  className?: string;
  elevation?: number;
  square?: boolean;
}

const Paper = (props: Props, ref: Ref<any>): ReactElement => {
  const {
    component: Component = 'div',
    className: classNameProp,
    elevation = 1,
    square = false,
    ...otherProps
  } = props;

  const className = classnames(
    styles.root,
    styles[`elevation${elevation}`],
    {
      [styles.rounded]: !square,
    },
    classNameProp,
  );

  return (
    <Component className={className} ref={ref} {...otherProps} /> // eslint-disable-line react/jsx-props-no-spreading
  );
};

export default forwardRef(Paper);
