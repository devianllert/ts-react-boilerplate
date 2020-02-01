import api from './api';

export interface Repo {
  id: number;
  name: string;
}

const fetchRepos = async (username: string): Promise<Repo[]> => {
  const { data } = await api.get<Repo[]>(`https://api.github.com/users/${username}/repos`);

  return data;
};

export {
  fetchRepos,
};
