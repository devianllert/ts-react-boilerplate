import React, { ReactElement } from 'react';

import Container from '../index';

export default {
  title: 'Components/Container',
  component: Container,
};

export const Desktop = (): ReactElement => (
  <Container maxWidth="desktop" style={{ backgroundColor: '#d4d4d4' }}>Desktop container</Container>
);

export const Laptop = (): ReactElement => (
  <Container maxWidth="laptop" style={{ backgroundColor: '#d4d4d4' }}>Laptop container</Container>
);

export const Tablet = (): ReactElement => (
  <Container maxWidth="tablet" style={{ backgroundColor: '#d4d4d4' }}>Tablet container</Container>
);

export const Mobile = (): ReactElement => (
  <Container maxWidth="mobile" style={{ backgroundColor: '#d4d4d4' }}>Mobile container</Container>
);
