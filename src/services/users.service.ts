import api from './api';

export interface User {
  id: number;
  email: string;
  username: string;
  avatar: string;
  role: 'user' | 'premium' | 'admin';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('users/me');

  return data;
};
