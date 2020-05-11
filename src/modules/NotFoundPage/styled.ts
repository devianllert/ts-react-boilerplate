import styled from 'styled-components';

import { ReactComponent as NotFoundLogo } from './not_found.svg';


export const NotFoundSVG = styled(NotFoundLogo)`
  width: 100%;
  max-height: 320px;
  margin-bottom: 24px;
`;

export const CenteredBox = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
