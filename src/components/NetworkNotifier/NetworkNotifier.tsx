import React, {
  useState,
  useRef,
  ReactElement,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import useNetwork from '../../hooks/useNetwork';

import Button from '../Button';

import styles from './NetworkNotifier.module.scss';

const NetworkNotifier = (): ReactElement | null => {
  const [show, setShow] = useState(false);
  const timer = useRef<number>();
  const { t } = useTranslation();
  const network = useNetwork((state): void => {
    setShow(true);

    if (state.online) {
      timer.current = window.setTimeout((): void => setShow(false), 5000);
    }
  });

  useEffect((): (() => void) => (): void => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const closeNotifier = (): void => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setShow(false);
  };

  const message = network.online
    ? t('common.networkNotifier.connected')
    : t('common.networkNotifier.disconnected');

  const classes = classnames(
    styles.notifier,
    network.online ? styles.notifierSuccess : styles.notifierError,
  );

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
          <Button
            size="small"
            appearence="default"
            flat
            onClick={closeNotifier}
          >
            {t('common.networkNotifier.close')}
          </Button>
        </div>

        <span className={styles.notifierMessage}>{message}</span>
      </div>
    </CSSTransition>
  );
};

export default NetworkNotifier;
