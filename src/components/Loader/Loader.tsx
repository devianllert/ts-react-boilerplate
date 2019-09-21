import React, { ReactElement } from 'react';
import classnames from 'classnames';

import styles from './Loader.module.scss';

interface Props {
  fullscreen?: boolean;
}

const Loader = ({ fullscreen }: Props): ReactElement => (
  <div className={classnames(styles.overlay, fullscreen && styles.overlayFullHeight)}>
    <progress className={styles.loader} />
  </div>
);

export default Loader;
