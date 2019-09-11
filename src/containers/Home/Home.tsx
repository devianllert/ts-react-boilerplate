import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

const Home = (): ReactElement => (
  <>
    <Helmet>
      <title>Home</title>
    </Helmet>

    <h1>React Typescript Boilerplate</h1>
  </>
);

export default Home;
