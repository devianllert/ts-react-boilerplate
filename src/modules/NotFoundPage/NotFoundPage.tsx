import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { MdArrowBack } from 'react-icons/md';

import Button from '../../components/Button';
import Typography from '../../components/Typography';

import * as S from './styled';

const NotFoundPage = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('NOT_FOUND_TITLE')}</title>
      </Helmet>

      <S.CenteredContainer>
        <S.Image src="/img/not_found.svg" alt="not found" />

        <Typography variant="h1" align="center" gutterBottom>404</Typography>
        <Typography variant="h4" align="center" gutterBottom>{t('NOT_FOUND_TITLE')}</Typography>

        <Button to="/" startIcon={<MdArrowBack size={16} />}>{t('BACK')}</Button>
      </S.CenteredContainer>
    </>
  );
};

export default NotFoundPage;
