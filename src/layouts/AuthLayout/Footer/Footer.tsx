import React, { ReactElement } from 'react';

import * as S from './styled';

const Footer = (): ReactElement => (
  <S.FooterBox>
    <div>
      <span>Impress</span>
      <span>Privacy</span>
    </div>

    <div>EN</div>
  </S.FooterBox>
);

export default Footer;
