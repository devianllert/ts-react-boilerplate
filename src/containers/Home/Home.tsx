import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import MainLayout from '../../layout/MainLayout';

const Home = (): ReactElement => (
  <MainLayout>
    <Helmet>
      <title>Home</title>
    </Helmet>

    <h1>React Typescript Boilerplate</h1>
  </MainLayout>
);

export default Home;
