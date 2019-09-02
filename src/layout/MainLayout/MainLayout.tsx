import React, { Fragment, ReactChild, ReactElement } from 'react';

import style from './MainLayout.module.scss';

interface Props {
  children: ReactChild | ReactChild[];
}

const MainLayout = ({ children }: Props): ReactElement => (
  <Fragment>
    <header className={style.header}>header</header>

    <main className={style.content}>{children}</main>

    <footer className={style.footer}>footer</footer>
  </Fragment>
);

export default MainLayout;
