import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    // Charger le token JWT du localStorage lors du démarrage de l'application
    const userToken = localStorage.getItem('user');
    if (userToken) {
      setCurrentUser({ token: JSON.parse(userToken) });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser({ user: userData });
    console.log(currentUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={{ value }}>
      {props.children}
    </UserContext.Provider>
  );
}
