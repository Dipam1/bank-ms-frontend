import axios from './axios';

export const applyForLoan = (amount, termMonths, loanType) => {
  return axios.post('/loans/apply', { amount, termMonths, loanType });
};

export const getMyLoans = () => {
  return axios.get('/loans/my-loans');
};

export const approveLoan = (loanId) => {
  return axios.post(`/loans/approve/${loanId}`);
};

export const repayLoan = (loanId, amount) => {
  return axios.post('/loans/repay', { loanId, amount });
};
