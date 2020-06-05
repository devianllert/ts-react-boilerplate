import { useContext } from 'react';
import { ThemeContext as StyledContext } from 'styled-components';

import ThemeContext from '../components/ThemeProvider/ThemeContext';

const useTheme = (): [string, () => void] => {
  const { toggle } = useContext(ThemeContext);
  const { mode } = useContext(StyledContext);

  return [mode, toggle];
};

export default useTheme;
