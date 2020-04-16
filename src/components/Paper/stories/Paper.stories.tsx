import React, { ReactElement } from 'react';

import Paper from '../index';

export default {
  title: 'Components/Paper',
  component: Paper,
};

export const Basic = (): ReactElement => <Paper>Paper</Paper>;

export const Outlined = (): ReactElement => <Paper variant="outlined" elevation={6}>Paper</Paper>;

export const WithShadow = (): ReactElement => <Paper elevation={6}>Paper</Paper>;
