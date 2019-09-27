import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import useNetwork from '../../hooks/useNetwork';
import useBoolean from '../../hooks/useBoolean';
import useTimeoutFn from '../../hooks/useTimeoutFn';

import Button from '../Button';

import styles from './NetworkNotifier.module.scss';

const NetworkNotifier = (): ReactElement => {
  const [show, toggleShow] = useBoolean(false);
  const { t } = useTranslation();
  const { clear, set } = useTimeoutFn(() => toggleShow(false), 5000);
  const network = useNetwork((state): void => {
    toggleShow(true);

    if (state.online) set();
  });

  const closeNotifier = (): void => {
    clear();

    toggleShow(false);
  };

  const message = network.online ? t('common.networkNotifier.connected') : t('common.networkNotifier.disconnected');

  const classes = classnames(styles.notifier, network.online ? styles.notifierSuccess : styles.notifierError);

  return (
    <CSSTransition
      timeout={250}
      in={show}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: styles.slideEnter,
        enterActive: styles.slideEnterActive,
        exit: styles.slideExit,
        exitActive: styles.slideExitActive,
      }}
    >
      <div className={classes}>
        <div className={styles.notifierClose}>
          <Button size="small" appearence="default" flat onClick={closeNotifier}>
            {t('common.networkNotifier.close')}
          </Button>
        </div>

        <span className={styles.notifierMessage}>{message}</span>
      </div>
    </CSSTransition>
  );
};

export default NetworkNotifier;
