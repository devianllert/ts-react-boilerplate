import styled from 'styled-components';
import {
  layout,
  space,
  flexbox,
  SpaceProps,
  LayoutProps,
  FlexboxProps,
} from 'styled-system';

const Box = styled.div<SpaceProps & LayoutProps & FlexboxProps>`
  ${space}
  ${layout}
  ${flexbox}
`;

export default Box;
