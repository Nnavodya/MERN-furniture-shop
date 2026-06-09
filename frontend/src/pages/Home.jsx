// v2: Modular Home Page with Separated Components
import React from 'react'
import HeroSection from '../components/home/HeroSection'
import SpecialOfferBanner from '../components/home/SpecialOfferBanner'
import FeaturesBar from '../components/home/FeaturesBar'
import CategorySection from '../components/home/CategorySection'
import BestSellingProducts from '../components/home/BestSellingProducts'
import NewArrivals from '../components/home/NewArrivals'
import WhyChooseUs from '../components/home/WhyChooseUs'
import CustomerReviews from '../components/home/CustomerReviews'
import CTABanner from '../components/home/CTABanner'
import { colors } from '../components/home/constants'

const C = colors

const Home = () => (
  <div style={{ background: C.bg, minHeight: '100vh', color: C.text }}>
    <HeroSection />
    <SpecialOfferBanner />
    <FeaturesBar />
    <CategorySection />
    <BestSellingProducts />
    <NewArrivals />
    <WhyChooseUs />
    <CustomerReviews />
    <CTABanner />
  </div>
)

export default Home;