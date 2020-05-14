import React, { ReactElement } from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import Grid from '../Grid';
import { GridSpacing } from '../Grid.interface';

import Paper from '../../Paper';
import Container from '../../Container';

export default {
  title: 'Components/Grid',
  component: Grid,
  decorators: [withKnobs],
};

export const Basic = (): ReactElement => (
  <Container>
    <Grid container spacing={number('spacing', 0, { min: 0, max: 6 }) as GridSpacing}>
      <Grid item mobile={12}>
        <Paper>mobile=12</Paper>
      </Grid>
      <Grid item mobile={6}>
        <Paper>mobile=6</Paper>
      </Grid>
      <Grid item mobile={6}>
        <Paper>mobile=6</Paper>
      </Grid>
      <Grid item mobile={4}>
        <Paper>mobile=4</Paper>
      </Grid>
      <Grid item mobile={4}>
        <Paper>mobile=4</Paper>
      </Grid>
      <Grid item mobile={4}>
        <Paper>mobile=4</Paper>
      </Grid>
      <Grid item mobile={3}>
        <Paper>mobile=3</Paper>
      </Grid>
      <Grid item mobile={3}>
        <Paper>mobile=3</Paper>
      </Grid>
      <Grid item mobile={3}>
        <Paper>mobile=3</Paper>
      </Grid>
      <Grid item mobile={3}>
        <Paper>mobile=3</Paper>
      </Grid>
    </Grid>
  </Container>
);
