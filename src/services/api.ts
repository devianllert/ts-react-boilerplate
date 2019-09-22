import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  timeout: 1000 * 10,
});

export default api;
