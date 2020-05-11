import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { MdArrowBack } from 'react-icons/md';
import { useSpring, animated } from 'react-spring';

import Container from '../../components/Container';
import Button from '../../components/Button';
import Typography from '../../components/Typography';

import * as S from './styled';

const NotFoundPage = (): ReactElement => {
  const { t } = useTranslation();
  const scale = useSpring({
    from: {
      transform: 'scale(0.9)',
      opacity: 0,
    },
    to: {
      transform: 'scale(1)',
      opacity: 1,
    },
  });

  return (
    <>
      <Helmet>
        <title>{t('NOT_FOUND_TITLE')}</title>
      </Helmet>

      <Container>
        <S.CenteredBox>
          <animated.div style={scale}>
            <S.NotFoundSVG />
          </animated.div>

          <Typography component="h1" variant="h2" align="center" gutterBottom>404</Typography>
          <Typography variant="h4" align="center" paragraph>{t('NOT_FOUND_TITLE')}</Typography>

          <Button to="/" startIcon={<MdArrowBack size={16} />}>{t('BACK')}</Button>
        </S.CenteredBox>
      </Container>
    </>
  );
};

export default NotFoundPage;
