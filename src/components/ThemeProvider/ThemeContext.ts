import { createContext } from 'react';

export interface ThemeValues {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeValues>({
  theme: 'light',
  toggleTheme: () => {},
});

export default ThemeContext;
