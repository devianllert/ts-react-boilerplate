import loadable, { ImportComponent } from '../../utils/loadable';

const LoadableCounter = loadable((): ImportComponent => import(/* webpackChunkName: "counter" */ './Counter'));

export default LoadableCounter;
