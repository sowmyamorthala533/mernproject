// src/components/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange,createUser, 
    loginUser, 
    signInWithGoogle, 
    signInWithGithub, 
    logoutUser  } from './Components/firebase';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const signup = async (email, password) => {
    return await createUser(email, password);
  };
  const login = async (email, password) => {
    return await loginUser(email, password);
  };
  const loginWithGoogle = async () => {
    return await signInWithGoogle();
  };

  const loginWithGithub = async () => {
    return await signInWithGithub();
  };

  const logout = async () => {
    return await logoutUser();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    loginWithGithub,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};