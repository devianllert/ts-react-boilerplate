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
      <Typography variant="h4">
        <MdBubbleChart />
        <span>Reactive</span>
      </Typography>

      <Link to="/">{t('AUTH_HOME_LINK')}</Link>
    </S.HeaderBox>
  );
};

export default Header;
