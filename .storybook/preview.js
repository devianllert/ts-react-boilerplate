import React from 'react';
import { addDecorator } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';

import ResetStyles from '../src/design/ResetStyles';
import BaseStyles from '../src/design/BaseStyles';

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
  width: 100%;
`;

addDecorator((storyFn) => (
  <ThemeProvider theme={{ mode: 'light' }}>
    <ResetStyles />
    <BaseStyles />

    <Center>
      {storyFn()}
    </Center>
  </ThemeProvider>
));
