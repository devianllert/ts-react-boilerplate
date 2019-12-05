import React, { useCallback, ReactElement } from 'react';
import { useLocalStorage } from 'react-essential-tools';

import ThemeContext from './ThemeContext';

import checkPrefersDarkMode from '../../utils/checkPrefersDarkMode';

interface Props {
  children: ReactElement;
}

const ThemeProvider = (props: Props): ReactElement => {
  const { children } = props;

  const initialMode = checkPrefersDarkMode() ? 'dark' : 'light';

  const [enabledState, setEnabledState] = useLocalStorage<string>('app-theme', initialMode);

  const toggleTheme = useCallback(() => {
    setEnabledState(enabledState === 'dark' ? 'light' : 'dark');
  }, [enabledState, setEnabledState]);

  const context = {
    theme: enabledState,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={context}>
      <div className={`theme theme--${enabledState}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
