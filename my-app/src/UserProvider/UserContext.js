// src/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the UserContext with default value as null (no user)
const UserContext = createContext(null);

// Custom hook to use UserContext in any component
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to provide user data to the app
export const UserProvider = ({ children }) => {
  // State to hold user data
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
