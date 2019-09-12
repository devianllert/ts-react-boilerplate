import React, { ReactChild, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import style from './MainLayout.module.scss';

interface Props {
  children: ReactChild | ReactChild[];
}

const MainLayout = ({ children }: Props): ReactElement => (
  <>
    <header className={style.header}>
      <Link to="/" className={style.logo}>TS BOILERPLATE</Link>

      <ul className={style.menu}>
        <li className={style.menuItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={style.menuItem}>
          <Link to="/counter">Counter</Link>
        </li>
        <li className={style.menuItem}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </header>

    <main className={style.content}>{children}</main>

    <footer className={style.footer}>
      <span className={style.footerLogo}>TS Boilerplate</span>
    </footer>
  </>
);

export default MainLayout;
