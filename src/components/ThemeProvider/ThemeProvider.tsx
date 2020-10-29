import React, { useEffect, ReactNode, ReactElement } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useLocalStorage } from 'react-essential-tools';

import checkPrefersDarkMode from '../../utils/checkPrefersDarkMode';

import ThemeContext from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps): ReactElement => {
  const preferMode = checkPrefersDarkMode() ? 'dark' : 'light';

  const [mode, setMode] = useLocalStorage('mode', preferMode);

  const toggle = (): void => {
    const newMode = mode === 'light' ? 'dark' : 'light';

    setMode(newMode);
  };

  useEffect(() => {
    if (!['dark', 'light'].includes(mode)) setMode(preferMode);
  }, [mode, preferMode, setMode]);

  return (
    <ThemeContext.Provider value={{ toggle }}>
      <StyledThemeProvider theme={{ mode }}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
