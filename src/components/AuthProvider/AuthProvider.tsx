import React, {
  useState,
  useMemo,
  ReactNode,
  ReactElement,
} from 'react';

import {
  isAuthenticated,
  login,
  signUp,
  logout,
  UserLoginDTO,
  UserSignUpDTO,
} from '../../services/auth.service';

import AuthContext, { AuthContextValue } from './AuthContext';

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props): ReactElement => {
  const [hasAuth, setHasAuth] = useState(isAuthenticated);

  const handleLogin = async (payload: UserLoginDTO): Promise<void> => {
    await login(payload);

    setHasAuth(true);
  };

  const handleSignUp = async (payload: UserSignUpDTO): Promise<void> => {
    await signUp(payload);
  };

  const handleLogout = async (): Promise<void> => {
    await logout();

    setHasAuth(false);
  };

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated: hasAuth,
    login: handleLogin,
    signUp: handleSignUp,
    logout: handleLogout,
  }), [hasAuth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
