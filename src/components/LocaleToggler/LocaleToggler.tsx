import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import styles from './LocaleToogler.module.scss';

const LocaleToggler = (): ReactElement => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;

  const availableLangs = ['en', 'ru'].filter((lang): boolean => lang !== currentLang);

  return (
    <div className={styles.toggler} role="menu" tabIndex={0}>
      <span className={styles.title}>{currentLang}</span>

      <ul className={styles.menu}>
        {availableLangs.map((lang): ReactElement => (
          <li
            className={styles.menuItem}
            role="menuitem"
            tabIndex={0}
            onClick={(): Promise<TFunction> => i18n.changeLanguage(lang)}
            onKeyPress={(): Promise<TFunction> => i18n.changeLanguage(lang)}
            key={lang}
          >
            {lang}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocaleToggler;
