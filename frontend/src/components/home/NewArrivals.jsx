// v1: New Arrivals Component
import React from 'react'
import { Link } from 'react-router-dom'
import { TbArrowRight } from 'react-icons/tb'
import { newArrivals, colors } from './constants'

const NewArrivals = () => {
  const C = colors

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: C.text }}>
            Latest Furniture Collection 2026
          </h2>

          <p className="text-sm mt-2" style={{ color: C.textMuted }}>
            Discover our newest arrivals designed for modern living.
          </p>
        </div>

        <Link
          to="/products?filter=new"
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: C.accent }}
        >
          View All
          <TbArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {newArrivals.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
            style={{
              background: C.card,
              border: `1px solid ${C.divider}`,
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-72 object-cover"
            />

            <div className="p-5">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: C.accentLight,
                  color: C.accent,
                }}
              >
                {item.badge}
              </span>

              <h3 className="text-xl font-bold mt-3" style={{ color: C.text }}>
                {item.title}
              </h3>

              <p className="text-sm mt-2" style={{ color: C.textMuted }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

export default NewArrivals
