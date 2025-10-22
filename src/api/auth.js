import axios from './axios';

export const register = (username, password, email) => {
  return axios.post('/auth/register', { username, password, email });
};

export const login = (username, password) => {
  return axios.post('/auth/login', { username, password });
};
