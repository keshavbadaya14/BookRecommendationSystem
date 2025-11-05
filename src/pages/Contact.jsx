import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, BookOpen, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, handle submission
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setErrors(newErrors);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@bookwise.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Literary Lane, Book City, BC 12345",
      description: "Our cozy office space"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "Within 24 hours",
      description: "We're quick to respond"
    }
  ];

  const contactReasons = [
    {
      icon: BookOpen,
      title: "Book Recommendations",
      description: "Need help finding your next great read? Our curators are here to help with personalized suggestions."
    },
    {
      icon: MessageCircle,
      title: "General Inquiries",
      description: "Questions about our platform, features, or services? We're happy to provide information."
    },
    {
      icon: Users,
      title: "Partnership Opportunities",
      description: "Authors, publishers, or bookstores interested in collaboration? Let's discuss possibilities."
    }
  ];

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
            marginLeft: "620px",
            position: "absolute",
            color: "#000", // make sure text color stands out
          }}
        >
          Contact Us
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
          Have a question about a book or need help finding your next favorite
          read? We’re always happy to hear from fellow book lovers. Whether it’s
          feedback, support, or just a friendly hello — reach out anytime. Our
          team is here to assist you with personalized recommendations or
          inquiries. Let’s keep the love for reading alive, together.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffc46b] rounded-full mb-4">
                  <info.icon size={24} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{info.title}</h3>
                <p className="text-lg font-medium text-gray-800 mb-2">{info.details}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Reasons */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">Send Us a Message</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc46b] ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc46b] ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc46b] ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a subject</option>
                    <option value="book-recommendation">Book Recommendation Request</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc46b] resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ffc46b] text-black px-8 py-4 text-lg font-semibold hover:bg-[#ffac2f] transition-all rounded-lg flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </div>
            </div>

            {/* Contact Reasons */}
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">How Can We Help?</h2>
              <div className="space-y-8">
                {contactReasons.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-[rgba(255,196,107,0.2)] rounded-full">
                        <reason.icon size={20} className="text-[#ffc46b]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">{reason.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Quick Links */}
              <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-black mb-4">Quick Help</h3>
                <div className="space-y-3">
                  <a href="/contact" className="block text-[#ffc46b] hover:text-[#ffac2f] transition-colors">
                    → How do book recommendations work?
                  </a>
                  <a href="/contact" className="block text-[#ffc46b] hover:text-[#ffac2f] transition-colors">
                    → Can I suggest books for review?
                  </a>
                  <a href="/contact" className="block text-[#ffc46b] hover:text-[#ffac2f] transition-colors">
                    → How to create a reading list?
                  </a>
                  <a href="/contact" className="block text-[#ffc46b] hover:text-[#ffac2f] transition-colors">
                    → Become a featured reviewer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section (Optional) */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-black mb-12">Find Us</h2>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-[#ffc46b] mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-700">Interactive Map Coming Soon</p>
              <p className="text-gray-600 mt-2">123 Literary Lane, Book City, BC 12345</p>
            </div>
          </div>
        </div>
      </div>

      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default Contact;