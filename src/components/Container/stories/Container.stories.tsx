import React, { ReactElement } from 'react';

import Container from '../index';

export default {
  title: 'Components/Container',
  component: Container,
};

export const Desktop = (): ReactElement => (
  <Container maxWidth="desktop" style={{ backgroundColor: '#d4d4d4' }}>Primary Button</Container>
);

export const Laptop = (): ReactElement => (
  <Container maxWidth="laptop" style={{ backgroundColor: '#d4d4d4' }}>Primary Button</Container>
);

export const Tablet = (): ReactElement => (
  <Container maxWidth="tablet" style={{ backgroundColor: '#d4d4d4' }}>Primary Button</Container>
);

export const Mobile = (): ReactElement => (
  <Container maxWidth="mobile" style={{ backgroundColor: '#d4d4d4' }}>Primary Button</Container>
);
