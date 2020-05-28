import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { MdLock, MdEmail, MdPerson } from 'react-icons/md';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { signUp, UserSignUpDTO } from '../../services/auth.service';

import useRouter from '../../hooks/useRouter';

import Typography from '../../components/Typography';
import Button from '../../components/Button';
import TextField from '../../components/Input/TextField';
import TextFieldPassword from '../../components/Input/TextFieldPassword';
import InputAdornment from '../../components/Input/InputAdornment';


import * as S from './styled';

const SignupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('FIELD_ERROR_EMAIL_INVALID')
    .required('FIELD_ERROR_REQUIRED'),
  username: Yup.string()
    .required('FIELD_ERROR_REQUIRED'),
  password: Yup.string()
    .required('FIELD_ERROR_REQUIRED'),
});

const SignUpPage = (): ReactElement => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const handleSignup = async (data: UserSignUpDTO, actions: FormikHelpers<UserSignUpDTO>): Promise<void> => {
    try {
      await signUp(data);

      push('/login');
    } catch (error) {
      actions.setStatus(error.response.data.message);
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
  } = useFormik<UserSignUpDTO>({
    validationSchema: SignupValidationSchema,
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    onSubmit: handleSignup,
  });

  return (
    <>
      <Helmet>
        <title>{t('SIGNUP_TITLE')}</title>
      </Helmet>

      <S.Form onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5" gutterBottom>
          {t('SIGNUP_TITLE')}
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

        <TextField
          fullWidth
          required
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          error={touched.username && !!errors.username}
          margin="dense"
          label="Username"
          type="text"
          name="username"
          helperText={(touched.username && errors.username && t(errors.username)) ?? ' '}
          placeholder={t('USERNAME_PLACEHOLDER')}
          startAdornment={(
            <InputAdornment position="start">
              <MdPerson size={24} />
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
          <Button type="submit" disabled={isSubmitting} fullWidth>{t('SIGNUP_PAGE_ACTION_SIGNUP')}</Button>
        </S.FormActions>

        <S.FormActions>
          <Link to="/login">
            <Typography variant="subtitle2" color="textSecondary">
              {t('SIGNUP_PAGE_ACTION_LOGIN')}
            </Typography>
          </Link>
        </S.FormActions>
      </S.Form>
    </>
  );
};

export default SignUpPage;
