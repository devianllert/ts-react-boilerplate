import loadable, { ImportComponent } from '../../utils/loadable';

const LoadableCounter = loadable((): ImportComponent => import(/* webpackChunkName: "reposPage" */ './ReposPage'));

export default LoadableCounter;
