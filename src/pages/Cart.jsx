import React from "react";
import { useCart } from "../pages/CartContent";
import axios from "axios";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cartItems, removeFromCart, loading, refreshCart } = useCart();

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert("Please log in to proceed with checkout");
        return;
      }

      console.log('🛒 Starting checkout with token:', token ? 'Token present' : 'No token');

      const response = await axios.post(
        "http://localhost:5000/api/checkout",
        {}, // Empty body since we're not sending data
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("✅ Checkout success:", response.data);

      // Show success message
      alert(
        `${response.data.message}! Processed ${response.data.itemsProcessed} items.`
      );

      // Refresh cart (should be empty after checkout)
      await refreshCart();
    } catch (error) {
      console.error("❌ Checkout error:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });

      // More specific error messages
      if (error.response?.status === 401) {
        alert("Please log in to complete checkout");
      } else if (error.response?.status === 403) {
        alert("Your session has expired. Please log in again");
        // Optionally redirect to login
        // window.location.href = '/login';
      } else if (error.response?.status === 400) {
        alert(error.response.data.error || "Cart is empty or invalid");
      } else {
        alert("Checkout failed. Please try again.");
      }
    }
  };

  const handleRemoveItem = async (item) => {
    await removeFromCart(item.item_id);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-4">Cart</h2>
        <p>Loading cart items...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-4">Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4 p-4 border rounded"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-24 w-16 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/64x96?text=No+Image";
                  }}
                />
                <div className="flex-1 ml-4">
                  <p className="font-semibold">{item.title}</p>
                  {item.author && (
                    <p className="text-gray-600 text-sm">by {item.author}</p>
                  )}
                </div>
                <p>Qty: {item.quantity}</p>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-red-500 font-bold text-xl ml-4 px-2 hover:bg-red-100 rounded"
                  title="Remove item"
                >
                  &times;
                </button>
              </div>
            ))}

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">
                  Total: ${calculateTotal()}
                </span>
                <span className="text-gray-600">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="bg-[#ffc46b] px-6 py-3 font-semibold mt-6 rounded hover:bg-[#ffb84d] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;