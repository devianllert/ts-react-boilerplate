/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext } from 'react';
import { ReactReduxContext } from 'react-redux';
import { Reducer } from 'redux';

import getInjectors from '../utils/reducerInjectors';
import { EnhancedStore } from '../configureStore';

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
