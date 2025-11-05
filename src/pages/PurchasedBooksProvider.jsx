import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PurchasedBooksContext = createContext();

export const usePurchasedBooks = () => useContext(PurchasedBooksContext);

const API_BASE_URL = "http://localhost:5000/api";

export const PurchasedBooksProvider = ({ children }) => {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPurchasedBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/purchased-books`);
      setPurchasedBooks(response.data.books || []);
    } catch (error) {
      console.error('Error fetching purchased books:', error);
      setError('Failed to load purchased books');
      setPurchasedBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshPurchasedBooks = async () => {
    await fetchPurchasedBooks();
  };

  // Calculate stats
  const getTotalBooks = () => {
    return purchasedBooks.reduce((total, book) => total + book.quantity, 0);
  };

  const getTotalSpent = () => {
    return purchasedBooks.reduce((total, book) => total + (book.price * book.quantity), 0);
  };

  const getUniqueBooks = () => {
    return purchasedBooks.length;
  };

  return (
    <PurchasedBooksContext.Provider value={{
      purchasedBooks,
      loading,
      error,
      fetchPurchasedBooks,
      refreshPurchasedBooks,
      getTotalBooks,
      getTotalSpent,
      getUniqueBooks
    }}>
      {children}
    </PurchasedBooksContext.Provider>
  );
};