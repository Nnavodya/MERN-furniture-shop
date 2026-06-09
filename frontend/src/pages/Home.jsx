

import React from 'react'
import { Link } from 'react-router-dom'
import { TbArrowRight, TbStar, TbTruck, TbShieldCheck, TbRefresh } from 'react-icons/tb'
import heroImg from '../assets/Hero.jpg'
import {
  TbArrowRight,
  TbStar,
  TbTruck,
  TbShieldCheck,
  TbRefresh,
  TbPlayerPlay
} from 'react-icons/tb'

const features = [
  { icon: TbTruck,       title: 'Free Delivery',   desc: 'On all orders over $100'     },
  { icon: TbShieldCheck, title: '2 Year Warranty', desc: 'On every piece of furniture' },
  { icon: TbRefresh,     title: 'Easy Returns',    desc: '30-day hassle-free returns'  },
  { icon: TbStar,        title: 'Premium Quality', desc: 'Handpicked by our experts'   },
]

const categories = [
  { label: 'Living Room', path: 'living-room', emoji: '🛋️' },
  { label: 'Bedroom',     path: 'bedroom',     emoji: '🛏️' },
  { label: 'Dining Room', path: 'dining',      emoji: '🍽️' },
  { label: 'Office',      path: 'office',      emoji: '💼' },
  { label: 'Outdoor',     path: 'outdoor',     emoji: '🌿' },
  { label: 'Lighting',    path: 'lighting',    emoji: '💡' },
]

const C = {
  bg:           '#FAF7F4',
  card:         '#FFFFFF',
  accent:       '#8B5E2E',
  accentLight:  'rgba(139,94,46,0.08)',
  accentBorder: 'rgba(139,94,46,0.18)',
  text:         '#2C1A0E',
  textMuted:    'rgba(44,26,14,0.55)',
  divider:      'rgba(139,94,46,0.12)',
}

const Home = () => (
  <div style={{ background: C.bg, minHeight: '100vh', color: C.text }}>

    {/* ── Hero — Full Background Image ── */}
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
      {/* Dark overlay — text readable වෙන්න */}
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
          <p className="text-lg max-w-md" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Thoughtfully designed pieces for every room. Quality craftsmanship, delivered to your door.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/products"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
              style={{ background: '#D4A373', color: '#2C1A0E' }}
              onMouseEnter={e => e.currentTarget.style.background = '#C49060'}
              onMouseLeave={e => e.currentTarget.style.background = '#D4A373'}
            >
              Shop Now <TbArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/products?filter=new"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
              style={{
                background: 'transparent',
                color:      '#FFFFFF',
                border:     '1.5px solid rgba(255,255,255,0.5)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              New Arrivals
            </Link>
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

    {/* ── Features Bar ── */}
    <section style={{ background: C.accentLight, borderBottom: `1px solid ${C.divider}` }}>
      <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg shrink-0"
              style={{ background: '#FFFFFF', border: `1px solid ${C.accentBorder}` }}
            >
              <Icon className="h-5 w-5" style={{ color: C.accent }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: C.text }}>{title}</p>
              <p className="text-xs" style={{ color: C.textMuted }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── Shop by Category ── */}
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: C.text }}>Shop by Category</h2>
          <p className="text-sm mt-1" style={{ color: C.textMuted }}>Find the perfect piece for every room</p>
        </div>
        <Link
          to="/products"
          className="flex items-center gap-1 text-sm font-medium transition-colors"
          style={{ color: C.accent }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          View all <TbArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map(({ label, path, emoji }) => (
          <Link
            key={path}
            to={`/products?category=${path}`}
            className="flex flex-col items-center gap-2 py-5 px-3 rounded-xl text-center transition-all duration-150"
            style={{ background: C.card, border: `1px solid ${C.divider}`, color: C.textMuted }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = C.accent
              e.currentTarget.style.color       = C.accent
              e.currentTarget.style.background  = C.accentLight
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = C.divider
              e.currentTarget.style.color       = C.textMuted
              e.currentTarget.style.background  = C.card
            }}
          >
            <span className="text-2xl">{emoji}</span>
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </section>

    {/* ── CTA Banner ── */}
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

  </div>
)

export default Home;