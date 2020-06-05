/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

import { UserLoginDTO, UserSignUpDTO } from '../../services/auth.service';

export interface AuthContextValue {
  isAuthenticated: boolean;
  login: (payload: UserLoginDTO) => Promise<void>;
  signUp: (payload: UserSignUpDTO) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  login: (payload: UserLoginDTO) => new Promise(() => {}),
  signUp: (payload: UserSignUpDTO) => new Promise(() => {}),
  logout: () => new Promise(() => {}),
});

export default AuthContext;
