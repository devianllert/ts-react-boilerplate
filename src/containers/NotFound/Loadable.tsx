import loadable, { ImportComponent } from '../../utils/loadable';

const LoadableNotFound = loadable((): ImportComponent => import(/* webpackChunkName: "notFound" */ './NotFound'), {
  fallback: null,
});

export default LoadableNotFound;
