import React, { ComponentType, ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  enabled: boolean;
  redirect: string;
  component: ComponentType<any>;
}

const PrivateRoute = (props: Props): ReactElement => {
  const {
    enabled,
    redirect,
    component: Component,
    ...otherProps
  } = props;

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      render={({ location }): ReactElement => (
        enabled ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: redirect, state: { from: location } }} />
        ))}
    />
  );
};

export default PrivateRoute;
