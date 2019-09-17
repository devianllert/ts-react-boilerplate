import loadable, { ImportComponent } from '../../utils/loadable';

const LoadableHome = loadable((): ImportComponent => import(/* webpackChunkName: "home" */ './Home'));

export default LoadableHome;
