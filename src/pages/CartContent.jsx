import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const API_BASE_URL = "http://localhost:5000/api";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Setup Axios with token
  const axiosWithAuth = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Fetch cart items from database
  const fetchCartItems = async () => {
    if (!token) return; // Don't fetch if user is not logged in
    try {
      setLoading(true);
      const response = await axiosWithAuth.get("/cart");
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token invalid or expired
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirect to login
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async (book) => {
    if (!token) {
      alert("Please login to add items to your cart.");
      window.location.href = "/login";
      return;
    }

    try {
      await axiosWithAuth.post("/cart", {
        id: book.id || Math.floor(Date.now() + Math.random() * 1000),
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.img,
        pdf_url: book.pdf_url,
      });

      await fetchCartItems();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axiosWithAuth.delete(`/cart/${itemId}`);
      await fetchCartItems();
    } catch (error) {
      console.error("Error removing from cart:", error);
      alert("Failed to remove item from cart. Please try again.");
    }
  };

  const clearCart = async () => {
    try {
      await axiosWithAuth.delete("/cart");
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        loading,
        refreshCart: fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
