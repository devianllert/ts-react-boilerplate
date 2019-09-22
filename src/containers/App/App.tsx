import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import MainLayout from '../../layout/MainLayout';

import HomePage from '../HomePage/Loadable';
import CounterPage from '../CounterPage/Loadable';
import AdvicePage from '../AdvicePage/Loadable';
import NotFoundPage from '../NotFoundPage';

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
        <Route exact path={['/', '/counter', '/advice']}>
          <MainLayout>
            <Route exact path="/" component={HomePage} />
            <Route path="/counter" component={CounterPage} />
            <Route path="/advice" component={AdvicePage} />
          </MainLayout>
        </Route>

        <Route component={NotFoundPage} />
      </Switch>

      <NetworkNotifier />
    </div>
  );
};

export default App;
