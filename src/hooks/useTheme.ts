import { useEffect, useCallback } from 'react';

import useLocalStorage from './useLocalStorage';

import checkPrefersDarkMode from '../utils/checkPrefersDarkMode';

const useTheme = (): [string, () => void] => {
  const [enabledState, setEnabledState] = useLocalStorage<string>('theme');
  const prefersDarkMode = checkPrefersDarkMode();

  const enabled = enabledState || (prefersDarkMode ? 'dark' : 'light');

  const toggleTheme = useCallback(() => {
    setEnabledState(enabled === 'dark' ? 'light' : 'dark');
  }, [enabled, setEnabledState]);

  useEffect(() => {
    const classNameDark = 'theme--dark';
    const classNameLight = 'theme--light';

    const element = window.document.body;

    if (enabled === 'dark') {
      element.classList.add(classNameDark);
      element.classList.remove(classNameLight);
    } else {
      element.classList.add(classNameLight);
      element.classList.remove(classNameDark);
    }
  }, [enabled]);

  return [enabled, toggleTheme];
};

export default useTheme;
