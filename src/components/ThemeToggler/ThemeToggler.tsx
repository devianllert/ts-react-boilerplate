import React, { ReactElement } from 'react';

import useTheme from '../../hooks/useTheme';

import styles from './ThemeToggler.module.scss';

const ThemeToggler = (): ReactElement => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div
      className={styles.toggler}
      role="button"
      tabIndex={0}
      onClick={toggleTheme}
      onKeyPress={toggleTheme}
    >
      <span className={styles.title}>{theme}</span>
    </div>
  );
};

export default ThemeToggler;
