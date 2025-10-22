import axios from './axios';

export const deposit = (accountNumber, amount) => {
  return axios.post('/transactions/deposit', { accountNumber, amount });
};

export const withdraw = (accountNumber, amount) => {
  return axios.post('/transactions/withdraw', { accountNumber, amount });
};

export const transfer = (fromAccountNumber, toAccountNumber, amount) => {
  return axios.post('/transactions/transfer', { fromAccountNumber, toAccountNumber, amount });
};

export const getTransactions = (accountId) => {
  return axios.get(`/transactions/${accountId}`);
};
