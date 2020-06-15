/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { ReactReduxContext } from 'react-redux';
import { Reducer } from 'redux';

import { EnhancedStore } from '../core/configureStore';

import getInjectors from '../utils/reducerInjectors';

interface UseInjectReducerOptions {
  key: string;
  reducer: Reducer;
}

/**
 * Hook that dynamically injects a reducer when the hook is run
 */
const useInjectReducer = ({ key, reducer }: UseInjectReducerOptions): void => {
  const context = useContext(ReactReduxContext);

  useEffect(() => {
    getInjectors(context.store as EnhancedStore).injectReducer(key, reducer);
  }, []);
};

export default useInjectReducer;
