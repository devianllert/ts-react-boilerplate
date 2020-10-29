import React, { ReactElement } from 'react';
import { CircularProgress } from 'react-essential-tools';

import { Overlay } from './styled';

interface LoaderProps {
  fullscreen?: boolean;
}

const Loader = ({ fullscreen }: LoaderProps): ReactElement => (
  <Overlay fullscreen={fullscreen}>
    <CircularProgress />
  </Overlay>
);

export default Loader;
