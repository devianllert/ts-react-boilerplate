import React, { ReactElement } from 'react';

import HiddenCss from '../HiddenCss';
import Paper from '../../../Paper';

export default {
  title: 'Components/HiddenCss',
  component: HiddenCss,
};

export const Basic = (): ReactElement => (
  <>
    <HiddenCss breakpoint="desktop">
      <Paper>Desktop</Paper>
    </HiddenCss>

    <HiddenCss breakpoint="laptop">
      <Paper>Laptop</Paper>
    </HiddenCss>

    <HiddenCss breakpoint="tablet">
      <Paper>Tablet</Paper>
    </HiddenCss>

    <HiddenCss breakpoint="mobile">
      <Paper>Mobile</Paper>
    </HiddenCss>
  </>
);
