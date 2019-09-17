/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */

import React, {
  lazy,
  Suspense,
  ReactElement,
  ComponentType,
} from 'react';

import Loader from '../components/Loader';

export interface LoadableOptions {
  fallback: ReactElement | null;
}

export type Loadable = (importFunc: () => ImportComponent, opt?: LoadableOptions) => ComponentType;

export type ImportComponent = Promise<{ default: any }>;

const loadable: Loadable = (
  importFunc,
  opts = { fallback: <Loader /> },
): ComponentType => {
  const LazyComponent: ComponentType = lazy(importFunc);

  return (props: object): ReactElement => (
    <Suspense fallback={opts.fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
