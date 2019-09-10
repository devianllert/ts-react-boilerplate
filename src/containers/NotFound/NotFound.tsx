import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import Button from '../../components/Button';

import styles from './NotFound.module.scss';

const NotFound = (): ReactElement => (
  <div className={styles.container}>
    <Helmet>
      <title>Page Not Found</title>
    </Helmet>
    <h1 className={styles.logo}>404</h1>
    <h2 className={styles.title}>Page Not Found!</h2>
    <span className={styles.subtitle}>Hmm, looks like that page doesn`t exists</span>

    <Button to="/">Go Home</Button>
  </div>
);

export default NotFound;
