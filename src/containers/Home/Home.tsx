import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

const Home = (): ReactElement => (
  <div className="container">
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h1>React Typescript Boilerplate</h1>
  </div>
);

export default Home;
