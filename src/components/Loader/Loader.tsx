import React, { ReactElement } from 'react';
import { CircularProgress } from 'react-essential-tools';

import { Overlay } from './styled';

interface Props {
  fullscreen?: boolean;
}

const Loader = ({ fullscreen }: Props): ReactElement => (
  <Overlay fullscreen={fullscreen}>
    <CircularProgress />
  </Overlay>
);

export default Loader;
