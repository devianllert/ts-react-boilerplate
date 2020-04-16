import styled from 'styled-components';

import Container from '../../components/Container';

export const Image = styled.img`
  width: 100%;
  max-height: 400px;
  margin-bottom: 16px;
`;

export const CenteredContainer = styled(Container)`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
