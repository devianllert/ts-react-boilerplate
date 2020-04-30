import styled from 'styled-components';

import { dark } from '../../../design/colors';
import { spacings } from '../../../design/spacings';

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  height: 100%;
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  z-index: 1;
`;

export const Overlay = styled.div`
  position: relative;

  display: flex;
  align-items: flex-end;

  height: 120px;

  padding: 0 ${spacings[3]};

  color: ${dark.text.primary};

  box-shadow: inset 0px -100px 32px -32px rgb(0,0,0,0.5);

  z-index: 2;
`;

export const Author = styled.a`
  display: flex;
  align-items: center;

  color: inherit;

  margin-bottom: ${spacings[3]};

  &:hover {
    text-decoration: underline;
  }
`;

export const AuthorCredentials = styled.div`
  margin-left: ${spacings[2]};
`;
