import axios from './axios';

export const createGiftCard = (balance, expiryDate, userId) => {
  return axios.post('/giftcards', { balance, expiryDate, userId });
};

export const deleteGiftCard = (cardId) => {
  return axios.delete(`/giftcards/${cardId}`);
};

export const getGiftCardBalance = (cardNumber) => {
  return axios.get(`/giftcards/${cardNumber}/balance`);
};

export const redeemGiftCard = (cardNumber, amount) => {
  return axios.post('/giftcards/redeem', { cardNumber, amount });
};
