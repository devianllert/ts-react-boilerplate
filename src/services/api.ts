import axios from 'axios';

import history from '../utils/history';

import createAuthRefreshInterceptor from './interceptors';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  timeout: 1000 * 10,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');

  // don't override Authtorization header in requests
  if (token && !config.headers.Authorization) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Function that will be called to refresh authorization
const refreshAuthLogic = async (failedRequest: any): Promise<void> => {
  try {
    const { data } = await api.post('auth/refresh', undefined, { withCredentials: true });

    localStorage.setItem('accessToken', data.accessToken);

    // eslint-disable-next-line no-param-reassign
    failedRequest.response.config.headers.Authorization = `Bearer ${data.accessToken}`;

    return Promise.resolve();
  } catch (error) {
    // If refresh is failed then delete tokens and redirect user to login page

    localStorage.removeItem('accessToken');

    // !FIXME: I think a better solution exists. I don't want to use history there, but we need redirect users.
    // TODO: Find a better solution for rederecting users when refreshing is failed.
    history.push('/login');

    return Promise.reject();
  }
};

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(api, refreshAuthLogic);

export default api;
