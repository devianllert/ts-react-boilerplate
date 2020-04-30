import React, { ReactElement, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdTranslate } from 'react-icons/md';

import Typography from '../../../components/Typography';
import Button from '../../../components/Button';

import * as S from './styled';

const Footer = (): ReactElement => {
  const { i18n } = useTranslation();

  // TODO: rewrite
  const changeLanguage = useCallback(() => {
    const currentLang = i18n.language;

    i18n.changeLanguage(currentLang === 'ru' ? 'en' : 'ru');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return (
    <S.FooterBox>
      <S.PolicyBox>
        <Typography component={Link} to="/impress" variant="subtitle2" color="textSecondary">Impress</Typography>

        <Typography
          component="span"
          variant="h4"
          color="textSecondary"
          style={{ margin: '0px 4px' }}
        >
          &#xB7;
        </Typography>

        <Typography component={Link} to="/privacy" variant="subtitle2" color="textSecondary">Privacy</Typography>
      </S.PolicyBox>

      <Button startIcon={<MdTranslate size={16} />} onClick={changeLanguage}>
        {i18n.language.toUpperCase()}
      </Button>
    </S.FooterBox>
  );
};
export default Footer;
