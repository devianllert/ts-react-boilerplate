import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import MainLayout from '../../layout/MainLayout';

import Home from '../Home/Loadable';
import Counter from '../Counter/Loadable';
import NotFound from '../NotFound';

import NetworkNotifier from '../../components/NetworkNotifier';

const App = (): ReactElement => {
  const { i18n } = useTranslation();

  return (
    <div className="app theme--light">
      <Helmet
        titleTemplate="%s - React TypeScript Boilerplate"
        defaultTitle="React TypeScript Boilerplate"
      >
        <html lang={i18n.language} />

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

      <NetworkNotifier />
    </div>
  );
};

export default App;
