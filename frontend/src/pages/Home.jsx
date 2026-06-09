import React from 'react'
import { Link } from 'react-router-dom'
import { TbArrowRight, TbStar, TbTruck, TbShieldCheck, TbRefresh } from 'react-icons/tb'
import heroImg from '../assets/Hero.jpg'

const features = [
  { icon: TbTruck,       title: 'Free Delivery',   desc: 'On all orders over $100'      },
  { icon: TbShieldCheck, title: '2 Year Warranty', desc: 'On every piece of furniture'  },
  { icon: TbRefresh,     title: 'Easy Returns',    desc: '30-day hassle-free returns'   },
  { icon: TbStar,        title: 'Premium Quality', desc: 'Handpicked by our experts'    },
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

    {/* ── Hero — Option 2: Left text + Right image ── */}
    <section style={{ background: '#FFFFFF', borderBottom: `1px solid ${C.divider}`, overflow: 'hidden' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center min-h-[520px] gap-0">

          {/* Left — Text content */}
          <div className="flex-1 flex flex-col gap-6 py-16 lg:py-20 lg:pr-12 items-start text-left">

            {/* Badge */}
            <span
              className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ background: C.accentLight, color: C.accent, border: `1px solid ${C.accentBorder}` }}
            >
              New Collection 2025
            </span>

            {/* Headline */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: C.text }}
            >
              Furniture That<br />Feels{' '}
              <span style={{ color: C.accent }}>Like Home</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg max-w-md" style={{ color: C.textMuted }}>
              Thoughtfully designed pieces for every room. Quality craftsmanship, delivered to your door.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                to="/products"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
                style={{ background: C.accent, color: '#FFFFFF' }}
                onMouseEnter={e => e.currentTarget.style.background = '#7A5229'}
                onMouseLeave={e => e.currentTarget.style.background = C.accent}
              >
                Shop Now <TbArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products?filter=new"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
                style={{ background: 'transparent', color: C.accent, border: `1.5px solid ${C.accentBorder}` }}
                onMouseEnter={e => e.currentTarget.style.background = C.accentLight}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                New Arrivals
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 pt-2">
              {[
                { value: '500+', label: 'Products'      },
                { value: '10k+', label: 'Happy Customers'},
                { value: '4.9★', label: 'Rating'        },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-xl font-bold" style={{ color: C.text }}>{value}</p>
                  <p className="text-xs" style={{ color: C.textMuted }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero image */}
          <div
            className="w-full lg:w-[520px] shrink-0 relative"
            style={{ height: '520px' }}
          >
            {/* Decorative background shape */}
            <div
              className="absolute inset-0 lg:inset-y-0 lg:right-0"
              style={{
                background: C.accentLight,
                borderRadius: '0 0 0 80px',
              }}
            />

            {/* Hero image */}
            <img
              src={heroImg}
              alt="Beautiful furniture collection"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                borderRadius: '0 0 0 80px',
                mixBlendMode: 'multiply',   // ← transparent effect — background color blends through
              }}
            />

            {/* Floating badge — top left of image */}
            <div
              className="absolute top-8 left-4 lg:-left-6 px-4 py-2 rounded-xl shadow-sm"
              style={{
                background: '#FFFFFF',
                border: `1px solid ${C.accentBorder}`,
                zIndex: 10,
              }}
            >
              <p className="text-xs font-semibold" style={{ color: C.accent }}>✨ New Arrivals</p>
              <p className="text-xs" style={{ color: C.textMuted }}>Spring 2025</p>
            </div>

            {/* Floating badge — bottom right of image */}
            <div
              className="absolute bottom-10 right-4 px-4 py-2 rounded-xl shadow-sm"
              style={{
                background: '#FFFFFF',
                border: `1px solid ${C.accentBorder}`,
                zIndex: 10,
              }}
            >
              <p className="text-xs font-semibold" style={{ color: C.text }}>🚚 Free Delivery</p>
              <p className="text-xs" style={{ color: C.textMuted }}>On orders over $100</p>
            </div>
          </div>

        </div>
      </div>
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