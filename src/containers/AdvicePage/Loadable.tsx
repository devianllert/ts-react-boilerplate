import loadable, { ImportComponent } from '../../utils/loadable';

const LoadableAdvicePage = loadable((): ImportComponent => import(/* webpackChunkName: "advicePage" */ './AdvicePage'));

export default LoadableAdvicePage;
