import { useContext } from 'react';

import ThemeContext, { ThemeValues } from '../components/ThemeProvider/ThemeContext';

const useTheme = (): ThemeValues => useContext(ThemeContext);

export default useTheme;
