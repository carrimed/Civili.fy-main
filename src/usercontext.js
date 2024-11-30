// UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    contactNumber: '',
    birthDate: '',
    age: '',
    occupation: '',
    civilStatus: '',
    address: '',
    zipcode: '',
  });

  const updateUserData = (data) => {
    setUserData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};