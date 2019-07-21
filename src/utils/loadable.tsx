import React, {
  lazy,
  Suspense,
  ReactElement,
  ComponentType,
} from 'react';

export type ImportComponent = Promise<{ default: any }>;

const loadable = (importFunc: () => ImportComponent, { fallback = null }): ComponentType => {
  const LazyComponent: ComponentType = lazy(importFunc);

  return (props: object): ReactElement => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
