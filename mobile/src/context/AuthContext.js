import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { api, setAuthToken } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const savedToken = await SecureStore.getItemAsync('authToken');
        const savedUser = await SecureStore.getItemAsync('authUser');
        if (savedToken) {
          setAuthToken(savedToken);
          setToken(savedToken);
        }
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.warn('Failed to restore auth state', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (username, password) => {
    const response = await api.post('/api/auth/login', { username, password });
    const { token: jwt, user: userInfo } = response.data;
    setAuthToken(jwt);
    setToken(jwt);
    setUser(userInfo);
    await SecureStore.setItemAsync('authToken', jwt);
    await SecureStore.setItemAsync('authUser', JSON.stringify(userInfo));
  };

  const logout = async () => {
    setAuthToken(null);
    setToken(null);
    setUser(null);
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('authUser');
  };

  const value = { user, token, loading, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
