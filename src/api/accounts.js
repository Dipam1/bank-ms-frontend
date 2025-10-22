import axios from './axios';

export const getMyAccounts = () => {
  return axios.get('/accounts/my-accounts');
};

export const getAccount = (accountId) => {
  return axios.get(`/accounts/${accountId}`);
};

export const createAccount = (accountData) => {
  return axios.post('/accounts', accountData);
};

export const deleteAccount = (accountId) => {
  return axios.delete(`/accounts/${accountId}`);
};
