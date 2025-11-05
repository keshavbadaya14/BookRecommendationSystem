import React from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../pages/CartContent'; // Adjust the path as needed

const Navbar = () => {
  const { cartItems } = useCart();

  // Calculate total quantity of items in cart
  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const totalItems = getTotalCartItems();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Left - Website Name with Emoji */}
      <Link to="/" className="text-xl font-bold flex items-center space-x-2">
        <span role="img" aria-label="owl">🦉</span>
        <span>BookWise</span>
      </Link>

      {/* Center - Navigation Links */}
      <div className="space-x-8 text-black font-medium text-lg">
        <Link to="/your-books" className="hover:text-[#ffc46b] transition-colors">Your Books</Link>
        <Link to="/predict" className="hover:text-[#ffc46b] transition-colors">Predict Time</Link>
        <Link to="/about" className="hover:text-[#ffc46b] transition-colors">About</Link>
        <Link to="/contact" className="hover:text-[#ffc46b] transition-colors">Contact</Link>
        <Link to="/login" className="hover:text-[#ffc46b] transition-colors">Login</Link>
        <Link to="/signup" className="hover:text-[#ffc46b] transition-colors">Signup</Link>
      </div>

      {/* Right - Cart and Profile Icons */}
      <div className="flex items-center space-x-6 text-2xl text-black">
        <Link to="/cart" className="relative">
          <FaShoppingCart className="cursor-pointer hover:text-[#ffc46b] transition-colors" />
          {/* Cart Count Badge */}
          {totalItems >= 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </Link>
        <Link to="/profile">
          <FaUserCircle className="cursor-pointer hover:text-[#ffc46b] transition-colors" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;