import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, register as apiRegister } from '../api';
import { getMe } from '../api';
import api from '../api/axios';
import { DataContext } from './DataContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { setUserInfo } = useContext(DataContext);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserInfo();
    }
  }, [token]);

  const fetchUserInfo = async () => {
    try {
      const response = await getMe();
      console.log(response.data);
      setUserInfo(response.data);
    } catch (error) {
      console.error('Failed to fetch user info', error);
      logout();
      // Handle error, maybe logout user if token is invalid
    }
  };

  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials.username, credentials.password);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await fetchUserInfo(); // Fetch user info after login
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      await apiRegister(userData.username, userData.password, userData.email);
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUserInfo(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
