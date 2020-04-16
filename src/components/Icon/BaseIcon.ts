import styled from 'styled-components';

interface BaseIconProps {
  size: number;
}

const BaseIcon = styled.span<BaseIconProps>`
  display: inline-block;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  color: inherit;

  font-style: normal;

  line-height: 0;

  text-align: center;
  text-transform: none;

  vertical-align: -0.125em;

  text-rendering: optimizeLegibility;

  user-select: none;
  overflow: hidden;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export default BaseIcon;
