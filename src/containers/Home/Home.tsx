import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import styles from './Home.module.scss';

const Home = (): ReactElement => (
  <>
    <Helmet>
      <title>Home</title>
    </Helmet>

    <div className={styles.header}>
      <h1 className={styles.title}>React Typescript Boilerplate</h1>
      <p className={styles.subtitle}>
        A highly scalable, offline-first foundation with the best
        developer experience and a focus on performance and best practices.
      </p>
    </div>
  </>
);

export default Home;
