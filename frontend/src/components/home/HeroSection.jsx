// v1: Hero Section Component
import React from 'react'
import { Link } from 'react-router-dom'
import { TbArrowRight, TbPlayerPlay } from 'react-icons/tb'
import heroImg from '../../assets/Hero.jpg'
import { colors } from './constants'

const HeroSection = () => {
  const C = colors

  return (
    <section
      style={{
        position:           'relative',
        minHeight:          '600px',
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
          background: 'linear-gradient(to right, rgba(20,10,5,0.75) 0%, rgba(20,10,5,0.45) 60%, rgba(20,10,5,0.15) 100%)',
        }}
      />

      {/* Content */}
      <div
        className="container mx-auto px-4"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="flex flex-col justify-center min-h-[600px] max-w-2xl gap-6 py-20">

          {/* Badge */}
          <div className="flex flex-wrap gap-3 items-center">
            <span
              className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full w-fit"
              style={{
                background: 'rgba(212,163,115,0.2)',
                color: '#F5DEB3',
                border: '1px solid rgba(212,163,115,0.4)',
              }}
            >
              New Collection 2025
            </span>

            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{
                background: '#D4A373',
                color: '#2C1A0E',
              }}
            >
              🔥 Up to 30% OFF
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl font-bold leading-tight"
            style={{ color: '#FFFFFF' }}
          >
            Furniture That<br />Feels{' '}
            <span style={{ color: '#D4A373' }}>Like Home</span>
          </h1>

          {/* Subtext */}
          <p
            className="text-lg max-w-lg"
            style={{ color: 'rgba(255,255,255,0.78)' }}
          >
            Discover premium furniture collections crafted for modern living.
            Transform your home with elegant sofas, dining sets, bedroom furniture,
            and décor designed for comfort and style.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* Shop Now */}
            <Link
              to="/products"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
              style={{
                background: '#D4A373',
                color: '#2C1A0E',
              }}
            >
              Shop Now
              <TbArrowRight className="h-4 w-4" />
            </Link>

            {/* Explore Collection */}
            <Link
              to="/products"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
              style={{
                background: '#FFFFFF',
                color: '#2C1A0E',
              }}
            >
              Explore Collection
              <TbArrowRight className="h-4 w-4" />
            </Link>

            {/* Watch Room Tour */}
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <TbPlayerPlay className="h-4 w-4" />
              Watch Room Tour
            </button>

          </div>

          {/* Stats row */}
          <div
            className="flex items-center gap-6 pt-4 mt-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
          >
            {[
              { value: '500+', label: 'Products'       },
              { value: '10k+', label: 'Happy Customers' },
              { value: '4.9★', label: 'Rating'          },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-xl font-bold" style={{ color: '#D4A373' }}>{value}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</p>
              </div>
            ))}
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

export default HeroSection
