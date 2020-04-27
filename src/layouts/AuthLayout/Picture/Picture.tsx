import React, { ReactElement } from 'react';
import { Skeleton } from 'react-essential-tools';
import { useQuery } from 'react-query';

import Avatar from '../../../components/Avatar';
import Typography from '../../../components/Typography';

import { getRandomPhoto } from '../../../services/unsplash.service';

import * as S from './styled';

const Picture = (): ReactElement => {
  const { data, isFetching } = useQuery('login/photo', getRandomPhoto, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isFetching || !data) {
    return (
      <S.Wrapper>
        <Skeleton variant="rect" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }} />

        <S.Overlay>
          <S.Author as="div">
            <Skeleton variant="circle" width="50px" height="50px" />

            <S.AuthorCredentials>
              <Skeleton variant="text" width="120px" />
              <Skeleton variant="text" width="80px" />
            </S.AuthorCredentials>
          </S.Author>
        </S.Overlay>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Image src={data.urls.regular} alt={data.alt_description || data.description || data.user.username} />

      <S.Overlay>
        <S.Author href={`${data.user.links.html}?utm_source=react&utm_medium=referral`} target="_blank">
          <Avatar src={data.user.profile_image.medium} alt={data.user.username} />

          <S.AuthorCredentials>
            <Typography
              display="block"
              color="inherit"
              component="span"
              variant="subtitle1"
            >
              {data.user.name}
            </Typography>
            <Typography
              display="block"
              color="inherit"
              component="p"
              variant="subtitle2"
            >
              @{data.user.username}
            </Typography>
          </S.AuthorCredentials>
        </S.Author>
      </S.Overlay>
    </S.Wrapper>
  );
};

export default Picture;
