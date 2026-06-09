// v1: Hero Section Component — fixed JSX structure
import React from 'react'
import { Link } from 'react-router-dom'
import { TbArrowRight, TbPlayerPlay } from 'react-icons/tb'
import heroImg from '../../assets/Hero.jpg'

const C = {
  bg:      '#FAF7F4',
  accent:  '#8B5E2E',
}

const HeroSection = () => {
  return (
    <section
      style={{
        position:           'relative',
        minHeight:          '650px',
        backgroundImage:    `url(${heroImg})`,
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        backgroundRepeat:   'no-repeat',
        overflow:           'hidden',
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to right, rgba(20,10,5,0.78) 0%, rgba(20,10,5,0.50) 60%, rgba(20,10,5,0.15) 100%)',
        }}
      />

      {/* Content */}
      <div
        className="container mx-auto px-4"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="flex flex-col lg:grid lg:grid-cols-2 items-center min-h-[650px] gap-12 py-16">

          {/* ── LEFT SIDE ── */}
          <div className="max-w-2xl">

            {/* Badges */}
            <div className="flex flex-wrap gap-3 items-center mb-6">
              <span
                className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(212,163,115,0.20)',
                  color:      '#F5DEB3',
                  border:     '1px solid rgba(212,163,115,0.40)',
                }}
              >
                New Collection 2026
              </span>

              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{
                  background: '#D4A373',
                  color:      '#2C1A0E',
                }}
              >
                🔥 Up to 30% OFF
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-5xl md:text-6xl font-bold leading-tight mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Furniture That
              <br />
              Feels{' '}
              <span style={{ color: '#D4A373' }}>Like Home</span>
            </h1>

            {/* Description */}
            <p
              className="text-lg max-w-lg mb-8"
              style={{ color: 'rgba(255,255,255,0.78)' }}
            >
              Discover premium furniture collections crafted for modern living.
              Transform your home with elegant sofas, dining sets, bedroom
              furniture, and décor designed for comfort and style.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3 flex-wrap mb-8">
              <Link
                to="/products"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
                style={{ background: '#D4A373', color: '#2C1A0E' }}
                onMouseEnter={e => e.currentTarget.style.background = '#C49060'}
                onMouseLeave={e => e.currentTarget.style.background = '#D4A373'}
              >
                Shop Now
                <TbArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/products"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
                style={{ background: '#FFFFFF', color: '#2C1A0E' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Explore Collection
                <TbArrowRight className="h-4 w-4" />
              </Link>

              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
                style={{
                  background:    'rgba(255,255,255,0.12)',
                  color:         '#FFFFFF',
                  border:        '1px solid rgba(255,255,255,0.30)',
                  backdropFilter:'blur(10px)',
                  cursor:        'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.20)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              >
                <TbPlayerPlay className="h-4 w-4" />
                Watch Room Tour
              </button>
            </div>

            {/* Stats */}
            <div
              className="flex items-center gap-8 pt-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
            >
              {[
                { value: '500+', label: 'Products'        },
                { value: '10k+', label: 'Happy Customers' },
                { value: '4.9★', label: 'Rating'          },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-xl font-bold" style={{ color: '#D4A373' }}>
                    {value}
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDE — Glass Card ── */}
          <div className="hidden lg:flex justify-center">
            <div
              className="p-8 rounded-3xl"
              style={{
                width:           '360px',
                background:      'rgba(255,255,255,0.12)',
                backdropFilter:  'blur(16px)',
                border:          '1px solid rgba(255,255,255,0.18)',
                boxShadow:       '0 20px 50px rgba(0,0,0,0.25)',
              }}
            >
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: '#D4A373', color: '#2C1A0E' }}
              >
                Summer Collection 2026
              </span>

              <h3
                className="text-3xl font-bold mt-4"
                style={{ color: '#FFFFFF' }}
              >
                Premium Living
              </h3>

              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.80)' }}
              >
                Upgrade your home with our newest luxury furniture collection.
              </p>

              {/* offer box */}
              <div
                className="mt-6 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <h4 className="text-xl font-bold" style={{ color: '#D4A373' }}>
                  Up to 30% OFF
                </h4>
                <p
                  className="text-sm mt-1"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                  Limited-time offer on selected furniture.
                </p>
              </div>

              {/* feature list */}
              <div className="mt-6 space-y-3">
                {[
                  '🚚 Free Delivery',
                  '⭐ Premium Quality',
                  '🔒 Secure Payments',
                  '↩ Easy Returns',
                ].map(item => (
                  <div key={item} className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {item}
                  </div>
                ))}
              </div>

              <Link
                to="/products"
                className="block text-center mt-6 py-3 rounded-xl font-semibold transition-all duration-150"
                style={{ background: '#D4A373', color: '#2C1A0E', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.90'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Shop Now
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade into page bg */}
      <div
        style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          height:     '80px',
          background: `linear-gradient(to bottom, transparent, ${C.bg})`,
        }}
      />
    </section>
  )
}

export default HeroSection;