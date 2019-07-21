import loadable, { ImportComponent } from '../../utils/loadable';

const LoadableCounter = loadable((): ImportComponent => import(/* webpackChunkName: "counter" */ './Counter'), {
  fallback: null,
});

export default LoadableCounter;
