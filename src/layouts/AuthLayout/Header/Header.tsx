import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdBubbleChart } from 'react-icons/md';

import Typography from '../../../components/Typography';

import * as S from './styled';

const Header = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <S.HeaderBox>
      <Typography variant="h5">
        <MdBubbleChart />
        Reactive
      </Typography>

      <Typography component={Link} to="/" variant="subtitle2" color="textSecondary">{t('AUTH_HOME_LINK')}</Typography>
    </S.HeaderBox>
  );
};

export default Header;
