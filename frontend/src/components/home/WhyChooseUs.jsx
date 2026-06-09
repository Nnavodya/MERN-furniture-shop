// v1: Why Choose Us Component
import React from 'react'
import {
  TbTruck,
  TbLock,
  TbStar,
  TbRefresh,
  TbHeadset,
} from 'react-icons/tb'
import { colors } from './constants'

const WhyChooseUs = () => {
  const C = colors

  const reasons = [
    {
      icon: TbTruck,
      title: 'Free Delivery',
      desc: 'Fast and reliable delivery on selected orders.',
    },
    {
      icon: TbLock,
      title: 'Secure Payments',
      desc: 'Safe checkout with trusted payment methods.',
    },
    {
      icon: TbStar,
      title: 'Premium Quality',
      desc: 'Carefully selected furniture crafted to last.',
    },
    {
      icon: TbRefresh,
      title: 'Easy Returns',
      desc: 'Hassle-free returns within 30 days.',
    },
    {
      icon: TbHeadset,
      title: '24/7 Support',
      desc: 'Our team is always ready to help you.',
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold" style={{ color: C.text }}>
          Why Choose Us
        </h2>

        <p className="mt-3 text-sm" style={{ color: C.textMuted }}>
          We are committed to delivering premium furniture and an exceptional shopping experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

        {reasons.map((reason) => {
          const Icon = reason.icon
          return (
            <div
              key={reason.title}
              className="text-center p-6 rounded-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
              style={{
                background: C.card,
                border: `1px solid ${C.divider}`,
              }}
            >
              <Icon
                className="mx-auto mb-4"
                size={42}
                style={{ color: C.accent }}
              />
              <h3 className="font-semibold mb-2">
                {reason.title}
              </h3>
              <p className="text-sm" style={{ color: C.textMuted }}>
                {reason.desc}
              </p>
            </div>
          )
        })}

      </div>
    </section>
  )
}

export default WhyChooseUs
