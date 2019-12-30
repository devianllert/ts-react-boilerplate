import api from './api';

export interface Repo {
  id: number;
  name: string;
}

const fetchRepos = async (): Promise<Repo[]> => {
  const { data } = await api.get<Repo[]>('https://api.github.com/users/facebook/repos');

  return data;
};

export {
  fetchRepos,
};
