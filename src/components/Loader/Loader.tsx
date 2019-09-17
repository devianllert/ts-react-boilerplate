import React, { ReactElement } from 'react';
import classnames from 'classnames';

import styles from './Loader.module.scss';

interface Props {
  initial?: boolean;
}

const Loader = ({ initial }: Props): ReactElement => (
  <div className={classnames(styles.overlay, initial && styles.overlayFullHeight)}>
    <progress className={styles.loader} />
  </div>
);

export default Loader;
