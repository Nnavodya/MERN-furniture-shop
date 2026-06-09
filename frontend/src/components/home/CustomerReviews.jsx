// v1: Customer Reviews Component
import React from 'react'
import { TbStar } from 'react-icons/tb'
import { testimonials, colors } from './constants'

const CustomerReviews = () => {
  const C = colors

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold" style={{ color: C.text }}>
          What Our Customers Say
        </h2>

        <p className="mt-3 text-sm" style={{ color: C.textMuted }}>
          Trusted by thousands of happy customers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
            style={{
              background: C.card,
              border: `1px solid ${C.divider}`,
            }}
          >
            <div className="flex mb-4">
              {[...Array(item.rating)].map((_, i) => (
                <TbStar
                  key={i}
                  size={20}
                  style={{
                    color: "#F4B400",
                    fill: "#F4B400",
                  }}
                />
              ))}
            </div>

            <p className="italic mb-4" style={{ color: C.textMuted }}>
              "{item.review}"
            </p>

            <h4 className="font-semibold" style={{ color: C.text }}>
              — {item.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CustomerReviews
