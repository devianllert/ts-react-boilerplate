import React, { ReactElement, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdTranslate, MdWbSunny, MdWbCloudy } from 'react-icons/md';
import useTheme from '../../../hooks/useTheme';

import Typography from '../../../components/Typography';
import Button from '../../../components/Button';

import * as S from './styled';

const Footer = (): ReactElement => {
  const { i18n } = useTranslation();
  const [mode, toggle] = useTheme();

  // TODO: rewrite
  const changeLanguage = useCallback(() => {
    const currentLang = i18n.language;

    i18n.changeLanguage(currentLang === 'ru' ? 'en' : 'ru');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return (
    <S.FooterBox>
      <S.PolicyBox>
        <Link to="/impress">
          <Typography component="span" variant="subtitle2" color="textSecondary">Impress</Typography>
        </Link>

        <Typography
          component="span"
          variant="h4"
          color="textSecondary"
          style={{ margin: '0px 4px' }}
        >
          &#xB7;
        </Typography>

        <Link to="/privacy">
          <Typography component="span" variant="subtitle2" color="textSecondary">Privacy</Typography>
        </Link>
      </S.PolicyBox>

      <div>
        <Button onClick={toggle}>
          {mode === 'light' ? (
            <MdWbSunny size={16} />
          ) : (
            <MdWbCloudy size={16} />
          )}
        </Button>

        <Button startIcon={<MdTranslate size={16} />} onClick={changeLanguage}>
          {i18n.language.toUpperCase()}
        </Button>
      </div>
    </S.FooterBox>
  );
};
export default Footer;
