// v1: Best Selling Products Component
import React from 'react'
import { Link } from 'react-router-dom'
import { TbArrowRight, TbStar } from 'react-icons/tb'
import { bestSellingProducts, colors } from './constants'

const BestSellingProducts = () => {
  const C = colors

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: C.text }}>
            Best Selling Products
          </h2>
          <p className="text-sm mt-2" style={{ color: C.textMuted }}>
            Most loved furniture pieces by our customers
          </p>
        </div>

        <Link
          to="/products"
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: C.accent }}
        >
          View All
          <TbArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {bestSellingProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#8B5E2E]"
            style={{
              background: C.card,
              border: `1px solid ${C.divider}`,
            }}
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-4">

              {/* Name */}
              <h3 className="font-semibold text-lg" style={{ color: C.text }}>
                {product.name}
              </h3>

              {/* Price */}
              <p className="font-bold text-xl mt-2" style={{ color: C.accent }}>
                {product.price}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2 transition-all duration-300 hover:scale-110">
                <TbStar className="text-yellow-500" />
                <span>{product.rating}</span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">

                <button
                  className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105"
                  style={{
                    background: C.accent,
                    color: "#fff",
                  }}
                >
                  Add to Cart
                </button>

                <button
                  className="flex-1 py-2 rounded-lg text-sm font-semibold"
                  style={{
                    border: `1px solid ${C.accent}`,
                    color: C.accent,
                  }}
                >
                  Quick View
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BestSellingProducts
