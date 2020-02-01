import React, { ReactChild, ReactElement } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LocaleToggler from '../../components/LocaleToggler';
import ThemeToggler from '../../components/ThemeToggler';

import styles from './MainLayout.module.scss';

interface Props {
  children: ReactChild | ReactChild[];
}

const MainLayout = ({ children }: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>TS BOILERPLATE</Link>

        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <NavLink exact activeClassName={styles.active} to="/">{t('layout.main.menu.home')}</NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink activeClassName={styles.active} to="/counter">{t('layout.main.menu.counter')}</NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink activeClassName={styles.active} to="/advice">{t('layout.main.menu.advice')}</NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink activeClassName={styles.active} to="/repos">{t('layout.main.menu.repos')}</NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink activeClassName={styles.active} to="/about">{t('layout.main.menu.about')}</NavLink>
          </li>
          <li className={styles.menuItem}>
            <LocaleToggler />
          </li>
          <li className={styles.menuItem}>
            <ThemeToggler />
          </li>
        </ul>

      </header>

      <main className={styles.content}>{children}</main>

      <footer className={styles.footer}>
        <span className={styles.footerLogo}>TS Boilerplate</span>
      </footer>
    </>
  );
};

export default MainLayout;
