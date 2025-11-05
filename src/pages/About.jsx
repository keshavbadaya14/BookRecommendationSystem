import React from "react";
import { BookOpen, Users, Target, Award, Heart, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";

function About() {
  const stats = [
    { number: "10K+", label: "Books Curated", icon: BookOpen },
    { number: "50K+", label: "Happy Readers", icon: Users },
    { number: "500+", label: "Authors Featured", icon: Award },
    { number: "98%", label: "Satisfaction Rate", icon: Star }
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To connect readers with books that transform their perspectives, expand their knowledge, and enrich their lives through carefully curated recommendations."
    },
    {
      icon: Heart,
      title: "Our Passion",
      description: "We're driven by the belief that every person has a perfect book waiting to be discovered. Our team of literary enthusiasts works tirelessly to make those connections."
    },
    {
      icon: Users,
      title: "Our Community",
      description: "Building a vibrant community of book lovers who share recommendations, insights, and the joy of discovering new worlds through literature."
    }
  ];

  const team = [
    {
      name: "Charlie Green",
      role: "Founder & Literary Curator",
      image: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww",
      bio: "Former librarian with 10+ years of experience in literary curation and a passion for connecting readers with their next favorite book."
    },
    {
      name: "Michael Chen",
      role: "Tech Lead & Book Analytics",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bio: "Software engineer and avid reader who developed our recommendation algorithms to help match readers with books they'll love."
    },
    {
      name: "Emma Rodriguez",
      role: "Content Strategist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bio: "Published author and literary critic who crafts engaging content and maintains relationships with publishers and authors."
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
          About Us

        </div>
        <p className="position: absolute" style={{marginTop: "218px", width: "800px", textAlign: "center", marginLeft: "340px"}}>
            At our core, we believe that the right book can change your world.
            We curate and recommend handpicked titles that inspire, inform, and
            ignite curiosity. Whether you’re a lifelong bibliophile or just
            starting your reading journey, we’re here to help you turn pages
            that matter — one book at a time.
          </p>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffc46b] rounded-full mb-4">
                  <stat.icon size={24} className="text-black" />
                </div>
                <div className="text-3xl font-bold text-black mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2023 by a group of passionate readers and tech enthusiasts, our platform was born from a simple observation: in a world overflowing with books, finding the right one for you shouldn't be overwhelming.
                </p>
                <p>
                  What started as a small blog sharing book recommendations among friends has grown into a comprehensive platform serving thousands of readers worldwide. We combine human expertise with smart technology to deliver personalized book recommendations that truly resonate.
                </p>
                <p>
                  Today, we partner with independent bookstores, established publishers, and emerging authors to bring you diverse voices and stories that matter. Every recommendation is carefully considered, every review thoughtfully crafted.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Cozy reading corner with books"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-[#ffc46b] opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-black mb-12">What Drives Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[rgba(255,196,107,0.2)] rounded-full mb-6">
                  <value.icon size={32} className="text-[#ffc46b]" />
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-black mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-black mb-2">{member.name}</h3>
                  <p className="text-[#ffc46b] font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default About;