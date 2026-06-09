// v1: Special Offer Banner Component
import React from 'react'
import { Link } from 'react-router-dom'

const SpecialOfferBanner = () => {
  return (
    <section
      className="py-3"
      style={{
        background: "linear-gradient(90deg, #8B5E2E, #D4A373)",
        color: "#FFFFFF",
      }}
    >
      <div className="container mx-auto px-4 flex justify-center items-center">
        <p className="font-semibold text-sm md:text-base">
          🎉 Summer Sale - Up to 40% Off on Selected Furniture
        </p>

        <Link
          to="/products"
          className="ml-4 underline font-medium"
          style={{ color: "#FFFFFF" }}
        >
          Shop Now
        </Link>
      </div>
    </section>
  )
}

export default SpecialOfferBanner
