
import axios from 'axios';

const createApiInstance = () => {
  const storedToken = localStorage.getItem('_token');
  const headers = {};

  if (storedToken) {
    headers['Authorization'] = `Bearer ${storedToken}`;
  }
  return axios.create({
    baseURL: 'https://dev74.onlinetestingserver.com/acolai/api',
    headers,
  });
};

const api = createApiInstance();

export default api;
