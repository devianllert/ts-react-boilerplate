import React, {
  lazy,
  Suspense,
  ReactElement,
  ComponentType,
} from 'react';

export type importComponent = Promise<{ default: ComponentType }>;

const loadable = (importFunc: () => importComponent, { fallback = null }): ComponentType => {
  const LazyComponent: ComponentType = lazy(importFunc);

  return (props: object): ReactElement => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
