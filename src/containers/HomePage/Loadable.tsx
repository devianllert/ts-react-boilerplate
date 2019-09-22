import loadable, { ImportComponent } from '../../utils/loadable';

const LoadableHomePage = loadable((): ImportComponent => import(/* webpackChunkName: "homePage" */ './HomePage'));

export default LoadableHomePage;
