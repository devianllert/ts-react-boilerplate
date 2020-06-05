import React, { ReactElement } from 'react';

import HiddenJs from '../HiddenJs';
import Paper from '../../../Paper';

export default {
  title: 'Components/HiddenJs',
  component: HiddenJs,
};

export const Basic = (): ReactElement => (
  <>
    <HiddenJs breakpoint="desktop">
      <Paper>Desktop</Paper>
    </HiddenJs>

    <HiddenJs breakpoint="laptop">
      <Paper>Laptop</Paper>
    </HiddenJs>

    <HiddenJs breakpoint="tablet">
      <Paper>Tablet</Paper>
    </HiddenJs>

    <HiddenJs breakpoint="mobile">
      <Paper>Mobile</Paper>
    </HiddenJs>
  </>
);
