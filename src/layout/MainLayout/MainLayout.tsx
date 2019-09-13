import React, { ReactChild, ReactElement } from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './MainLayout.module.scss';

interface Props {
  children: ReactChild | ReactChild[];
}

const MainLayout = ({ children }: Props): ReactElement => (
  <>
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>TS BOILERPLATE</Link>

      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <NavLink exact activeClassName={styles.active} to="/">Home</NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink activeClassName={styles.active} to="/counter">Counter</NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink activeClassName={styles.active} to="/about">About</NavLink>
        </li>
      </ul>
    </header>

    <main className={styles.content}>{children}</main>

    <footer className={styles.footer}>
      <span className={styles.footerLogo}>TS Boilerplate</span>
    </footer>
  </>
);

export default MainLayout;
