// v1: CTA Banner Component
import React from 'react'
import { Link } from 'react-router-dom'
import { TbArrowRight } from 'react-icons/tb'
import { colors } from './constants'

const CTABanner = () => {
  const C = colors

  return (
    <section className="container mx-auto px-4 pb-16">
      <div
        className="rounded-2xl px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ background: C.accent }}
      >
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">Get 20% off your first order</h3>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Sign up for our newsletter and enjoy exclusive deals.
          </p>
        </div>
        <Link
          to="/products"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
          style={{ background: '#FFFFFF', color: C.accent }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Shop the Sale <TbArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

export default CTABanner
