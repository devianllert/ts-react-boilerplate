import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { MdLock, MdEmail } from 'react-icons/md';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import useRouter from '../../hooks/useRouter';

import Typography from '../../components/Typography';
import Button from '../../components/Button';
import TextField from '../../components/Input/TextField';
import TextFieldPassword from '../../components/Input/TextFieldPassword';
import InputAdornment from '../../components/Input/InputAdornment';

import * as S from './styled';

interface LoginDTO {
  email: string;
  password: string;
}

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('FIELD_ERROR_EMAIL_INVALID')
    .required('FIELD_ERROR_REQUIRED'),
  password: Yup.string()
    .required('FIELD_ERROR_REQUIRED'),
});

const LoginPage = (): ReactElement => {
  const { t } = useTranslation();
  const { replace, location } = useRouter();
  const from = location.state?.from ?? {
    pathname: '/',
  };

  const handleLogin = async (data: LoginDTO, actions: FormikHelpers<LoginDTO>): Promise<void> => {
    try {
      console.log(data);

      // login ...

      replace(from);
    } catch (error) {
      actions.setSubmitting(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik<LoginDTO>({
    validationSchema: LoginValidationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <title>{t('LOGIN_TITLE')}</title>
      </Helmet>

      <S.Form onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5" gutterBottom>
          {t('LOGIN_TITLE')}
        </Typography>

        <TextField
          fullWidth
          required
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={touched.email && !!errors.email}
          margin="dense"
          label="Email"
          type="email"
          name="email"
          helperText={(touched.email && errors.email && t(errors.email)) ?? ' '}
          placeholder={t('EMAIL_PLACEHOLDER')}
          startAdornment={(
            <InputAdornment position="start">
              <MdEmail size={24} />
            </InputAdornment>
          )}
        />

        <TextFieldPassword
          fullWidth
          required
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={touched.password && !!errors.password}
          margin="dense"
          label="Password"
          name="password"
          helperText={(touched.password && errors.password && t(errors.password)) ?? ' '}
          placeholder={t('PASSWORD_PLACEHOLDER')}
          startAdornment={(
            <InputAdornment position="start">
              <MdLock size={24} />
            </InputAdornment>
          )}
        />

        <S.FormActions>
          <Button type="submit" disabled={isSubmitting} fullWidth>{t('LOGIN_PAGE_ACTION_LOGIN')}</Button>
        </S.FormActions>

        <S.FormActions>
          <Link to="/forgot">
            <Typography variant="subtitle2" color="textSecondary">
              {t('LOGIN_ACTION_FORGOT_PASSWORD')}
            </Typography>
          </Link>

          <Link to="/signup">
            <Typography variant="subtitle2" color="textSecondary">
              {t('LOGIN_PAGE_ACTION_REGISTER')}
            </Typography>
          </Link>
        </S.FormActions>

      </S.Form>
    </>
  );
};

export default LoginPage;
