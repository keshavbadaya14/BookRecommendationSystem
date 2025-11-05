// 📁 src/pages/Profile.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Calendar, User, BookOpen, Target, Edit3, Save, X, Camera } from 'lucide-react';
import Navbar from '../components/Navbar';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const locationInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    phone: '',
    bio: '',
    favoriteGenres: [],
    readingGoal: '',
    location: '',
    joinDate: ''
  });

  const navigate = useNavigate();

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 
    'Biography', 'History', 'Self-Help', 'Poetry', 'Horror', 'Thriller'
  ];

  // Sample location data - in real app, this would come from an API
  const locationDatabase = [
    { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    { city: 'Jaipur', state: 'Rajasthan', country: 'India' },
    { city: 'Delhi', state: 'Delhi', country: 'India' },
    { city: 'Bangalore', state: 'Karnataka', country: 'India' },
    { city: 'Chennai', state: 'Tamil Nadu', country: 'India' },
    { city: 'Kolkata', state: 'West Bengal', country: 'India' },
    { city: 'Hyderabad', state: 'Telangana', country: 'India' },
    { city: 'Pune', state: 'Maharashtra', country: 'India' },
    { city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
    { city: 'Surat', state: 'Gujarat', country: 'India' },
    { city: 'New York', state: 'New York', country: 'United States' },
    { city: 'Los Angeles', state: 'California', country: 'United States' },
    { city: 'Chicago', state: 'Illinois', country: 'United States' },
    { city: 'London', state: 'England', country: 'United Kingdom' },
    { city: 'Paris', state: 'Île-de-France', country: 'France' },
    { city: 'Tokyo', state: 'Tokyo', country: 'Japan' },
    { city: 'Sydney', state: 'New South Wales', country: 'Australia' },
    { city: 'Toronto', state: 'Ontario', country: 'Canada' },
    { city: 'Berlin', state: 'Berlin', country: 'Germany' },
    { city: 'Singapore', state: 'Singapore', country: 'Singapore' }
  ];

  useEffect(() => {
    // Load user data from localStorage or API
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        dateOfBirth: parsedUser.dateOfBirth || '',
        phone: parsedUser.phone || '',
        bio: parsedUser.bio || '',
        favoriteGenres: parsedUser.favoriteGenres || [],
        readingGoal: parsedUser.readingGoal || '',
        location: parsedUser.location || '',
        joinDate: parsedUser.joinDate || new Date().toISOString().split('T')[0]
      });
      if (parsedUser.profileImage) {
        setImagePreview(parsedUser.profileImage);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Handle location autocomplete
    if (name === 'location' && value.length > 0) {
      const suggestions = locationDatabase.filter(location => 
        location.city.toLowerCase().includes(value.toLowerCase()) ||
        location.state.toLowerCase().includes(value.toLowerCase()) ||
        location.country.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setLocationSuggestions(suggestions);
      setShowLocationSuggestions(true);
    } else if (name === 'location') {
      setShowLocationSuggestions(false);
    }
  };

  const selectLocation = (location) => {
    const locationString = `${location.city}, ${location.state}, ${location.country}`;
    setFormData(prev => ({
      ...prev,
      location: locationString
    }));
    setShowLocationSuggestions(false);
  };

  const handleGenreToggle = (genre) => {
    setFormData(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Here you would typically make an API call to update user profile
      // For now, we'll just update localStorage
      const updatedUser = {
        ...user,
        ...formData,
        profileImage: imagePreview
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        dateOfBirth: user.dateOfBirth || '',
        phone: user.phone || '',
        bio: user.bio || '',
        favoriteGenres: user.favoriteGenres || [],
        readingGoal: user.readingGoal || '',
        location: user.location || '',
        joinDate: user.joinDate || new Date().toISOString().split('T')[0]
      });
      setImagePreview(user.profileImage || null);
      setProfileImage(null);
    }
    setIsEditing(false);
    setError('');
    setShowLocationSuggestions(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffc46b]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <div
        style={{
          background: "rgba(255, 196, 107, 0.3)",
          position: "relative",
          height: "433px",
        }}
      >
        <div
          style={{
            fontSize: "70px",
            fontFamily: "noto-serif",
            fontWeight: "bold",
            marginTop: "120px",
            marginLeft: "580px",
            position: "absolute",
            color: "#000",
          }}
        >
          My Profile
        </div>
        <p
          className="position: absolute"
          style={{
            marginTop: "218px",
            width: "900px",
            textAlign: "center",
            marginLeft: "340px",
          }}
        >
          Manage your reading journey, update your preferences, and customize your literary experience. 
          Keep track of your favorite genres, reading goals, and connect with fellow book lovers in our community.
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="max-w-6xl mx-auto px-4 pt-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <p className="text-green-700 font-medium">{success}</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-6xl mx-auto px-4 pt-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-[rgba(255,196,107,0.2)] overflow-hidden border-4 border-[#ffc46b]">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={48} className="text-[#ffc46b]" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute -bottom-2 -right-2 bg-[#ffc46b] rounded-full p-3 shadow-lg cursor-pointer hover:bg-[#ffac2f] transition-colors">
                    <Camera size={16} className="text-black" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl font-bold text-black mb-4">{formData.name || 'Book Lover'}</h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-center lg:justify-start text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <span>{formData.email}</span>
                  </div>
                  {formData.location && (
                    <div className="flex items-center justify-center lg:justify-start text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      <span>{formData.location}</span>
                    </div>
                  )}
                  {formData.dateOfBirth && (
                    <div className="flex items-center justify-center lg:justify-start text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <span>Age: {calculateAge(formData.dateOfBirth)} years old</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-[#ffc46b] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#ffac2f] transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      <Save size={16} />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#ffc46b] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#ffac2f] transition-colors flex items-center gap-2"
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Personal Information */}
            <div>
              <h3 className="text-4xl font-bold text-black mb-8 flex items-center">
                <User size={28} className="mr-3 text-[#ffc46b]" />
                Personal Information
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc46b]"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800">
                      {formData.name || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc46b]"
                      placeholder="Enter your email address"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800">
                      {formData.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc46b]"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800">
                      {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc46b]"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800">
                      {formData.phone || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (City, State, Country)
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <input
                        ref={locationInputRef}
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc46b]"
                        placeholder="Start typing city name..."
                        onFocus={() => formData.location && setShowLocationSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                      />
                      {showLocationSuggestions && locationSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                          {locationSuggestions.map((location, index) => (
                            <div
                              key={index}
                              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => selectLocation(location)}
                            >
                              <div className="font-medium text-gray-800">
                                {location.city}, {location.state}, {location.country}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800">
                      {formData.location || 'Not provided'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reading Preferences */}
            <div>
              <h3 className="text-4xl font-bold text-black mb-8 flex items-center">
                <BookOpen size={28} className="mr-3 text-[#ffc46b]" />
                Reading Preferences
              </h3>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Favorite Genres
                  </label>
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-3">
                      {genres.map(genre => (
                        <button
                          key={genre}
                          type="button"
                          onClick={() => handleGenreToggle(genre)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            formData.favoriteGenres.includes(genre)
                              ? 'bg-[#ffc46b] text-black'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {formData.favoriteGenres.length > 0 ? (
                        formData.favoriteGenres.map(genre => (
                          <span key={genre} className="px-3 py-1 bg-[rgba(255,196,107,0.2)] text-[#ffc46b] rounded-full text-sm font-medium">
                            {genre}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No genres selected</span>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target size={16} className="inline mr-2" />
                    Annual Reading Goal
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="readingGoal"
                      value={formData.readingGoal}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc46b]"
                      placeholder="e.g., 24 books per year"
                      min="1"
                      max="365"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800">
                      {formData.readingGoal ? `${formData.readingGoal} books per year` : 'No goal set'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Your Reading Journey
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc46b] resize-none"
                      placeholder="Tell us about your reading preferences, favorite authors, or what inspires you to read..."
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800 min-h-[120px]">
                      {formData.bio || 'Share your reading story...'}
                    </div>
                  )}
                </div>
              </div>

              {/* Account Information */}
              <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-black mb-4">Account Information</h4>
                <p className="text-gray-600">
                  <span className="font-semibold">Member since:</span> {
                    formData.joinDate ? new Date(formData.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Recently joined'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewsletterSection />
      <Footer />
    </div>
  );
}