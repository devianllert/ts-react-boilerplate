import styled from 'styled-components';

import { spacings } from '../../design/spacings';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  max-width: 350px;
  width: 100%;

  padding: ${spacings[2]};
`;

export const FormHeader = styled.header`
  padding: 0;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;

  margin: ${spacings[1]} 0;
`;
