import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import MainLayout from '../../layout/MainLayout';

import Home from '../Home';
import Counter from '../Counter/Loadable';
import NotFound from '../NotFound/Loadable';

const App = (): ReactElement => (
  <div className="app theme--light">
    <Helmet
      titleTemplate="%s - React TypeScript Boilerplate"
      defaultTitle="React TypeScript Boilerplate"
    >
      <meta name="description" content="A React TypeScript Boilerplate application" />
    </Helmet>

    <Switch>
      <Route exact path={['/', '/counter']}>
        <MainLayout>
          <Route exact path="/" component={Home} />
          <Route path="/counter" component={Counter} />
        </MainLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
