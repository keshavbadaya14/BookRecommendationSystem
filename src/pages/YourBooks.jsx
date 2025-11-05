import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const YourBooks = () => {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api";

  const fetchPurchasedBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError("Please log in to view your books.");
        setLoading(false);
        return;
      }

      console.log('📚 Fetching purchased books with token:', token ? 'Token present' : 'No token');

      const response = await axios.get(`${API_BASE_URL}/purchased-books`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Purchased books fetched:', response.data);
      setPurchasedBooks(response.data.books || []);
    } catch (error) {
      console.error("❌ Error fetching purchased books:", error);
      
      if (error.response?.status === 401) {
        setError("Please log in to view your books.");
        // Optionally redirect to login
        // window.location.href = '/login';
      } else if (error.response?.status === 403) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError("Failed to load your books. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchasedBooks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateTotalSpent = () => {
    return purchasedBooks
      .reduce((total, book) => total + book.price * book.quantity, 0)
      .toFixed(2);
  };

  const getTotalBooks = () => {
    return purchasedBooks.reduce((total, book) => total + book.quantity, 0);
  };

  // Function to handle reading a book
  const handleReadNow = (book) => {
    if (book.pdf_url || book.book_url) {
      // Open the PDF in a new tab/window
      window.open(book.pdf_url || book.book_url, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback - you can customize this based on your needs
      alert(`PDF URL not available for "${book.title}". Please contact support.`);
    }
  };

  // Function to handle downloading a book
  const handleDownload = async (book) => {
    if (!book.pdf_url && !book.book_url) {
      alert(`Download URL not available for "${book.title}". Please contact support.`);
      return;
    }

    try {
      const url = book.pdf_url || book.book_url;
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      
      // Set the download attribute with a filename
      const filename = `${book.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      link.download = filename;
      
      // For cross-origin URLs, we might need to fetch and create blob
      try {
        const response = await fetch(url);
        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          link.href = blobUrl;
        }
      } catch (fetchError) {
        console.log('Direct fetch failed, trying direct download');
        // If fetch fails due to CORS, try direct download
      }
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up blob URL if created
      if (link.href.startsWith('blob:')) {
        window.URL.revokeObjectURL(link.href);
      }
      
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab if download fails
      window.open(book.pdf_url || book.book_url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6">Your Books</h2>
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading your books...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6">Your Books</h2>
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <p className="text-red-600">{error}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={fetchPurchasedBooks}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
              {error.includes("log in") && (
                <button
                  onClick={() => window.location.href = '/login'}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Go to Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Your Books</h2>

          {purchasedBooks.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <h3 className="text-2xl font-bold text-blue-600">
                    {getTotalBooks()}
                  </h3>
                  <p className="text-gray-600">Total Books</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-600">
                    ${calculateTotalSpent()}
                  </h3>
                  <p className="text-gray-600">Total Spent</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-600">
                    {purchasedBooks.length}
                  </h3>
                  <p className="text-gray-600">Unique Titles</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {purchasedBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">
              No books purchased yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start building your digital library by purchasing some books!
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-[#ffc46b] px-6 py-3 font-semibold rounded hover:bg-[#ffb84d] transition-colors"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {purchasedBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="h-32 w-24 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/96x128/e5e7eb/6b7280?text=No+Image";
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {book.title}
                        </h3>
                        {book.author && (
                          <p className="text-gray-600 mb-2">by {book.author}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">
                          ${(book.price * book.quantity).toFixed(2)}
                        </p>
                        {book.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            ${book.price.toFixed(2)} × {book.quantity}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Purchased: {formatDate(book.purchase_date)}</span>
                        {book.quantity > 1 && (
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            Qty: {book.quantity}
                          </span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleReadNow(book)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm cursor-pointer"
                          title="Read book online"
                        >
                          📖 Read Now
                        </button>
                        <button 
                          onClick={() => handleDownload(book)}
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors text-sm cursor-pointer"
                          title="Download book to device"
                        >
                          📥 Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center pt-6">
              <button
                onClick={fetchPurchasedBooks}
                className="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
              >
                🔄 Refresh Library
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourBooks;