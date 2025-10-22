import axios from './axios';

export const getAvailableLockers = () => {
  return axios.get('/lockers/available');
};

export const assignLocker = (lockerId) => {
  return axios.post('/lockers/assign', { lockerId });
};

export const getMyLocker = () => {
  return axios.get('/lockers/my-locker');
};
