import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

const NotFound = (): ReactElement => (
  <div className="container">
    <Helmet>
      <title>Page Not Found</title>
    </Helmet>
    <h1>Page Not Found!</h1>
  </div>
);

export default NotFound;
