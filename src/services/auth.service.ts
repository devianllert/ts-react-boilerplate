import api from './api';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface UserLoginDTO {
  emailOrUsername: string;
  password: string;
}

export interface UserSignUpDTO {
  email: string;
  username: string;
  password: string;
}

export const setTokens = (data: Tokens): void => {
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('expiresIn', data.expiresIn);
};

export const clearTokens = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expiresIn');
};

export const signUp = (payload: UserSignUpDTO): Promise<void> => api.post('auth/register', payload);

export const login = async (payload: UserLoginDTO): Promise<void> => {
  const { data } = await api.post<Tokens>('auth/login', payload);

  setTokens(data);
};

export const logout = async (): Promise<void> => {
  const token = localStorage.getItem('refreshToken');

  await api.post('auth/logout', { token })
    .finally(clearTokens);
};


export const refreshTokens = async (): Promise<string> => {
  const token = localStorage.getItem('refreshToken');

  const { data } = await api.post<Tokens>('auth/refresh', { token });

  setTokens(data);

  return data.refreshToken;
};

export const verifyEmail = (token?: string): Promise<void> => api.post(`auth/verify/${token}`);

export const isAuthenticated = (): boolean => Boolean(localStorage.getItem('accessToken'));
