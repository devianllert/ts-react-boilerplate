import api from './api';

export interface Advice {
  slip: {
    advice: string;
    slip_id: string;
  };
}

const fetchAdvice = async (): Promise<Advice> => {
  const { data } = await api.get<Advice>('https://api.adviceslip.com/advice');

  return data;
};

const fetchAdviceById = async (id: string): Promise<Advice> => {
  const { data } = await api.get<Advice>(`https://api.adviceslip.com/advice/${id}`);

  return data;
};

export {
  fetchAdvice,
  fetchAdviceById,
};
