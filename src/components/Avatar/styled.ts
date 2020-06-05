import styled from 'styled-components';
import { shape } from '../../design/shape';
import { BACKGROUND } from '../../design/colors';

interface AvatarProps {
  sizes?: string;
  srcSet?: string;
  variant?: 'circle' | 'rounded' | 'square';
  loaded?: boolean;
}

export const AvatarWrapper = styled.div<AvatarProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 50px;
  height: 50px;

  font-family: inherit;
  font-size: 24px;

  color: ${BACKGROUND};
  background-color: ${({ loaded }): string => (loaded ? 'transparent' : '#e0e0e0')};

  line-height: 1;

  border-radius: ${({ variant }): string => (
    (variant === 'rounded' && `${shape.borderRadius}px`)
    || (variant === 'square' && 'none')
    || '50%'
  )};

  overflow: hidden;

  user-select: none;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;

  text-align: center;

  /* Handle non-square image. The property isn't supported by IE 11. */
  object-fit: cover;

  /* Hide alt text. */
  color: transparent;

  /* Hide the image broken icon, only works on Chrome. */
  text-indent: 10000px;
`;

export const AvatarFallback = styled.div`
  width: 75%;
  height: 75%;
`;
