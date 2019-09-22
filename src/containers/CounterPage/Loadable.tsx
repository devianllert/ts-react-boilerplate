import loadable, { ImportComponent } from '../../utils/loadable';

const LoadableCounter = loadable((): ImportComponent => import(/* webpackChunkName: "counterPage" */ './CounterPage'));

export default LoadableCounter;
