import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-essential-tools';

import { ReposTrigger } from './types';

import { reposTrigger } from './actions';
import { makeSelectReposData } from './selectors';

import useInjectReducer from '../../hooks/useInjectReducer';
import useInjectSaga from '../../hooks/useInjectSaga';

import reducer from './reducer';
import saga from './saga';

import Button from '../../components/Button';

import styles from './ReposPage.module.scss';

const ReposPage = (): ReactElement => {
  useInjectReducer({ key: 'repos', reducer });
  useInjectSaga({ key: 'repos', saga });

  const { t } = useTranslation();
  const repos = useSelector(makeSelectReposData());
  const dispatch = useDispatch();

  const requestRepos = (): ReposTrigger => dispatch(reposTrigger());

  return (
    <>
      <Helmet>
        <title>{t('counter.headTitle')}</title>
      </Helmet>

      <div className={styles.content}>
        <Tooltip title="Fetch repositories" placement="top">
          <Button onClick={requestRepos}>Fetch</Button>
        </Tooltip>

        {(repos.length > 0) && (
          <ul>
            {repos.map((rep) => <li key={rep.id}>{rep.name}</li>)}
          </ul>
        )}
      </div>
    </>
  );
};

export default ReposPage;
