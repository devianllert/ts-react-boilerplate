import React, { ReactElement, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import MainLayout from '../../layouts/MainLayout';
import AuthLayout from '../../layouts/AuthLayout';

import NotFoundPage from '../NotFoundPage';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';

import Loader from '../../components/Loader';

import BaseStyles from '../../design/BaseStyles';
import ResetStyles from '../../design/ResetStyles';

const App = (): ReactElement => {
  const { i18n } = useTranslation(undefined, { useSuspense: false });

  return (
    <>
      <Helmet
        htmlAttributes={{ lang: i18n.language }}
        titleTemplate="%s - React TypeScript Boilerplate"
        defaultTitle="React TypeScript Boilerplate"
      >
        <meta name="description" content="A React TypeScript Boilerplate application" />
      </Helmet>

      <ResetStyles />
      <BaseStyles />

      <Suspense fallback={<Loader fullscreen />}>
        <Switch>
          <Route exact path={['/']}>
            <MainLayout>
              <Route exact path="/" component={HomePage} />
            </MainLayout>
          </Route>

          <Route exact path={['/login', '/signup']}>
            <AuthLayout>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={LoginPage} />
            </AuthLayout>
          </Route>

          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
