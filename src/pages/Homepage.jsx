import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import BookShowcaseSection from '../components/BookShowcaseSection'
import CategoryGrid from '../components/CategoryGrid'
import BestSeller from '../components/BestSeller'
import SelfPublishing from '../components/SelfPublishing'
import NewsletterSection from '../components/NewsletterSection'
import Footer from '../components/Footer'

function Homepage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <BookShowcaseSection />
      <CategoryGrid />
      <BestSeller />
      <SelfPublishing />
      <NewsletterSection />
      <Footer />
    </div>
  )
}

export default Homepage
