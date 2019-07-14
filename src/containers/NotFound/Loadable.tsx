import loadable, { importComponent } from '../../utils/loadable';

const LoadableNotFound = loadable((): importComponent => import(/* webpackChunkName: "notFound" */ './NotFound'), {
  fallback: null,
});

export default LoadableNotFound;
