import { useState, useMemo } from 'react';

import {
  login,
  signUp,
  logout,
  UserLoginDTO,
  UserSignUpDTO,
  isAuthenticated,
} from '../services/auth.service';

interface UseAuthReturn {
  isAuthenticated: boolean;
  login: (payload: UserLoginDTO) => Promise<void>;
  signUp: (payload: UserSignUpDTO) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuth = (): UseAuthReturn => {
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

  return useMemo(() => ({
    isAuthenticated: hasAuth,
    login: handleLogin,
    signUp: handleSignUp,
    logout: handleLogout,
  }), [hasAuth]);
};

export default useAuth;
