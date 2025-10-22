import React, { createContext, useState } from 'react';
import {
  getMyAccounts,
  getTransactions,
  transfer as apiTransfer,
  getMyLoans,
  applyForLoan as apiApplyForLoan,
  repayLoan as apiRepayLoan,
  getMyCards,
  applyForCreditCard as apiApplyForCreditCard,
  makeCreditCardPayment as apiMakeCreditCardPayment,
  getAvailableLockers,
  getMyLocker,
  assignLocker as apiAssignLocker,
  createGiftCard as apiCreateGiftCard,
  deleteGiftCard as apiDeleteGiftCard,
  getGiftCardBalance as apiGetGiftCardBalance,
  redeemGiftCard as apiRedeemGiftCard
  ,
  createAccount as apiCreateAccount,
  deleteAccount as apiDeleteAccount
} from '../api';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loans, setLoans] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [availableLockers, setAvailableLockers] = useState([]);
  const [myLocker, setMyLocker] = useState(null);
  const [giftCardBalance, setGiftCardBalance] = useState(null);

  const fetchAccounts = async () => {
    try {
      const response = await getMyAccounts();
      setAccounts(response.data);
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    }
  };

  const fetchTransactions = async (accountId) => {
    try {
      const response = await getTransactions(accountId);
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  const transfer = async (fromAccountNumber, toAccountNumber, amount) => {
    try {
      const response = await apiTransfer(fromAccountNumber, toAccountNumber, amount);
      fetchAccounts();
      return response.data;
    } catch (error) {
      console.error('Transfer failed', error);
      throw error;
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await getMyLoans();
      setLoans(response.data);
    } catch (error) {
      console.error("Failed to fetch loans", error);
    }
  };

  const applyForLoan = async (loanData) => {
    try {
      await apiApplyForLoan(loanData.amount, loanData.termMonths, loanData.loanType);
      fetchLoans();
    } catch (error) {
      console.error("Failed to apply for loan", error);
      throw error;
    }
  };

  const repayLoan = async (loanId, amount) => {
    try {
      await apiRepayLoan(loanId, amount);
      fetchLoans();
    } catch (error) {
      console.error("Failed to repay loan", error);
      throw error;
    }
  };

  const fetchCreditCards = async () => {
    try {
      const response = await getMyCards();
      setCreditCards(response.data);
    } catch (error) {
      console.error("Failed to fetch credit cards", error);
    }
  };

  const applyForCreditCard = async (cardData) => {
    try {
      await apiApplyForCreditCard(cardData.creditLimit);
      fetchCreditCards();
    } catch (error) {
      console.error("Failed to apply for credit card", error);
      throw error;
    }
  };

  const makeCreditCardPayment = async (paymentData) => {
    try {
      await apiMakeCreditCardPayment(paymentData.cardNumber, paymentData.amount);
      fetchCreditCards();
    } catch (error) {
      console.error("Failed to make credit card payment", error);
      throw error;
    }
  };

  const fetchAvailableLockers = async () => {
    try {
      const response = await getAvailableLockers();
      setAvailableLockers(response.data);
    } catch (error) {
      console.error("Failed to fetch available lockers", error);
    }
  };

  const fetchMyLocker = async () => {
    try {
      const response = await getMyLocker();
      setMyLocker(response.data);
    } catch (error) {
      console.error("Failed to fetch my locker", error);
    }
  };

  const assignLocker = async (lockerId) => {
    try {
      await apiAssignLocker(lockerId);
      fetchMyLocker();
      fetchAvailableLockers();
    } catch (error) {
      console.error("Failed to assign locker", error);
      throw error;
    }
  };

  const createGiftCard = async (cardData) => {
    try {
      await apiCreateGiftCard(cardData.balance, cardData.expiryDate, cardData.userId);
    } catch (error) {
      console.error("Failed to create gift card", error);
      throw error;
    }
  };

  const createAccount = async (accountData) => {
    try {
      const response = await apiCreateAccount(accountData);
      console.log(response)
      // refresh accounts list after successful creation
      fetchAccounts();
      return response.data;
    } catch (error) {
      console.error('Failed to create account', error);
      throw error;
    }
  };

  const deleteGiftCard = async (cardId) => {
    try {
      await apiDeleteGiftCard(cardId);
    } catch (error) {
      console.error("Failed to delete gift card", error);
      throw error;
    }
  };

  const getGiftCardBalance = async (cardNumber) => {
    try {
      const response = await apiGetGiftCardBalance(cardNumber);
      setGiftCardBalance(response.data.balance);
    } catch (error) {
      console.error("Failed to get gift card balance", error);
      setGiftCardBalance(null);
      throw error;
    }
  };

  const redeemGiftCard = async (redeemData) => {
    try {
      await apiRedeemGiftCard(redeemData.cardNumber, redeemData.amount);
    } catch (error) {
      console.error("Failed to redeem gift card", error);
      throw error;
    }
  };

  const deleteAccount = async (accountId) => {
    try {
      await apiDeleteAccount(accountId);
      fetchAccounts();
    } catch (error) {
      console.error("Failed to delete account", error);
      throw error;
    }
  };

  return (
    <DataContext.Provider value={{
      userInfo, setUserInfo,
      accounts, fetchAccounts,
      transactions, fetchTransactions,
      transfer,
      loans, fetchLoans, applyForLoan, repayLoan,
      creditCards, fetchCreditCards, applyForCreditCard, makeCreditCardPayment,
      availableLockers, fetchAvailableLockers,
      myLocker, fetchMyLocker,
      assignLocker,
      giftCardBalance, createGiftCard, deleteGiftCard, getGiftCardBalance, redeemGiftCard,
      createAccount,
      deleteAccount
    }}>
      {children}
    </DataContext.Provider>
  );
};