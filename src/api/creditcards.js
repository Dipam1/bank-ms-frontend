import axios from './axios';

export const applyForCreditCard = (creditLimit) => {
  return axios.post('/creditcards/apply', { creditLimit });
};

export const getMyCards = () => {
  return axios.get('/creditcards/my-cards');
};

export const makeCreditCardPayment = (cardNumber, amount) => {
  return axios.post('/creditcards/payment', { cardNumber, amount });
};
