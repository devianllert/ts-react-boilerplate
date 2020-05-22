import React, { ReactElement, ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  enabled: boolean;
  redirect: string;
  children: ReactNode;
}

const PrivateRoute = (props: Props): ReactElement => {
  const {
    enabled,
    redirect,
    children,
    ...otherProps
  } = props;

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      render={({ location }): ReactNode => (
        enabled ? (
          children
        ) : (
          <Redirect to={{ pathname: redirect, state: { from: location } }} />
        ))}
    />
  );
};

export default PrivateRoute;
