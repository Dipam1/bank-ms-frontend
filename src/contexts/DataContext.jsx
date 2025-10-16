import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const addData = (newData) => {
    setData([...data, newData]);
  };

  return (
    <DataContext.Provider value={{ data, addData, userInfo, setUserInfo }}>
      {children}
    </DataContext.Provider>
  );
};