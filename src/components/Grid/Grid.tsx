import React, { ReactElement, ReactNode, HTMLAttributes } from 'react';

import {
  GridContentAlignment,
  GridItemsAlignment,
  GridDirection,
  GridJustification,
  GridSpacing,
  GridWrap,
} from './Grid.interface';

import * as S from './styled';

interface Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content
   */
  children: ReactNode;
  /**
   * Defines the `align-content` style property.
   * It's applied for all screen sizes.
   */
  alignContent?: GridContentAlignment;
  /**
   * Defines the `align-items` style property.
   * It's applied for all screen sizes.
   */
  alignItems?: GridItemsAlignment;
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   */
  container?: boolean;
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   */
  direction?: GridDirection;
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   */
  item?: boolean;
  /**
   * Defines the `justify-content` style property.
   * It is applied for all screen sizes.
   */
  justify?: GridJustification;
  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   */
  spacing?: GridSpacing;
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   */
  wrap?: GridWrap;
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   */
  zeroMinWidth?: boolean;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `desktop` breakpoint and wider screens if not overridden.
   */
  desktop?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `laptop` breakpoint and wider screens if not overridden.
   */
  laptop?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `tablet` breakpoint and wider screens if not overridden.
   */
  tablet?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `mobile` breakpoint and wider screens if not overridden.
   */
  mobile?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const Grid = (props: Props): ReactElement => {
  const {
    children,
    alignContent = 'stretch',
    alignItems = 'stretch',
    container = false,
    direction = 'row',
    item = false,
    justify = 'flex-start',
    desktop = false,
    laptop = false,
    tablet = false,
    mobile = false,
    spacing = 0,
    wrap = 'wrap',
    zeroMinWidth = false,
    ...other
  } = props;

  return (
    <S.GridRow
      container={container}
      item={item}
      zeroMinWidth={zeroMinWidth}
      wrap={wrap}
      justify={justify}
      alignContent={alignContent}
      alignItems={alignItems}
      direction={direction}
      desktop={desktop}
      laptop={laptop}
      tablet={tablet}
      mobile={mobile}
      spacing={spacing}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {children}
    </S.GridRow>
  );
};

export default Grid;
