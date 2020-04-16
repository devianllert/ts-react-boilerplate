/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */

import React, {
  lazy,
  Suspense,
  ReactElement,
  ComponentType,
  ComponentProps,
} from 'react';

import Loader from '../components/Loader';

export interface LoadableOptions {
  fallback: ReactElement | null;
}

const loadable = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  opts: LoadableOptions = { fallback: <Loader /> },
): ComponentType<any> => {
  const LazyComponent = lazy(importFunc);

  return (props: ComponentProps<T>): ReactElement => (
    <Suspense fallback={opts.fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
