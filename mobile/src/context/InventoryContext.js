import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';

const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadInitial = async (orderBy = 'createdAt') => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get(`/api/products?orderBy=${orderBy}`),
        api.get('/api/categories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (e) {
      console.warn('Failed to load inventory', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitial();
  }, []);

  const reloadProducts = (orderBy = 'createdAt') => loadInitial(orderBy);

  const value = {
    products,
    categories,
    loading,
    reloadProducts
  };

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};

export const useInventory = () => useContext(InventoryContext);
