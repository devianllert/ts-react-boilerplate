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
};

export const clearTokens = (): void => {
  localStorage.removeItem('accessToken');
};

export const signUp = (payload: UserSignUpDTO): Promise<void> => api.post('auth/register', payload);

export const login = async (payload: UserLoginDTO): Promise<void> => {
  const { data } = await api.post<Tokens>('auth/login', payload, { withCredentials: true });

  setTokens(data);
};

export const logout = async (): Promise<void> => {
  await api.post('auth/logout', undefined, { withCredentials: true })
    .finally(clearTokens);
};

export const verifyEmail = (token?: string): Promise<void> => api.post(`auth/verify/${token}`);

export const isAuthenticated = (): boolean => Boolean(localStorage.getItem('accessToken'));
