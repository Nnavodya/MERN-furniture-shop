import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/Hero.jpg'
import {
  TbArrowRight,
  TbStar,
  TbTruck,
  TbShieldCheck,
  TbRefresh,
  TbPlayerPlay,
  TbLock,
  TbHeadset
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

const testimonials = [
  {
    name: "Sarah M.",
    review: "The sofa quality exceeded my expectations. Excellent craftsmanship and fast delivery.",
    rating: 5,
  },
  {
    name: "John D.",
    review: "Beautiful dining table and outstanding customer service. Highly recommended.",
    rating: 5,
  },
  {
    name: "Emily R.",
    review: "The furniture looks exactly like the photos. Premium quality and great value.",
    rating: 5,
  },
];

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

    {/* ── Special Offer Banner ── */}
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

    {/* ── Best Selling Products ── */}
<section className="container mx-auto px-4 py-16">
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2
        className="text-3xl font-bold"
        style={{ color: C.text }}
      >
        Best Selling Products
      </h2>
      <p
        className="text-sm mt-2"
        style={{ color: C.textMuted }}
      >
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

    {[
      {
        id: 1,
        name: "Modern Sofa",
        price: "$799",
        rating: "4.9",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      },
      {
        id: 2,
        name: "Wood Dining Table",
        price: "$599",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      },
      {
        id: 3,
        name: "Luxury Bed",
        price: "$999",
        rating: "4.9",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      },
      {
        id: 4,
        name: "Office Chair",
        price: "$299",
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800",
      },
    ].map((product) => (
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
          <h3
            className="font-semibold text-lg"
            style={{ color: C.text }}
          >
            {product.name}
          </h3>

          {/* Price */}
          <p
            className="font-bold text-xl mt-2"
            style={{ color: C.accent }}
          >
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
{/* ── New Arrivals ── */}
<section className="container mx-auto px-4 py-16">
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2
        className="text-3xl font-bold"
        style={{ color: C.text }}
      >
        Latest Furniture Collection 2026
      </h2>

      <p
        className="text-sm mt-2"
        style={{ color: C.textMuted }}
      >
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

    <div
      className="rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
      style={{
        background: C.card,
        border: `1px solid ${C.divider}`,
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
        alt="Bedroom Collection"
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
          NEW
        </span>

        <h3
          className="text-xl font-bold mt-3"
          style={{ color: C.text }}
        >
          Modern Bedroom Collection
        </h3>

        <p
          className="text-sm mt-2"
          style={{ color: C.textMuted }}
        >
          Elegant bedroom furniture crafted for comfort and luxury.
        </p>
      </div>
    </div>

    <div
      className="rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
      style={{
        background: C.card,
        border: `1px solid ${C.divider}`,
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200"
        alt="Living Room Collection"
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
          TRENDING
        </span>

        <h3
          className="text-xl font-bold mt-3"
          style={{ color: C.text }}
        >
          Luxury Living Room Set
        </h3>

        <p
          className="text-sm mt-2"
          style={{ color: C.textMuted }}
        >
          Premium sofas and coffee tables for a stylish home.
        </p>
      </div>
    </div>

    <div
      className="rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
      style={{
        background: C.card,
        border: `1px solid ${C.divider}`,
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200"
        alt="Dining Collection"
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
          2026 COLLECTION
        </span>

        <h3
          className="text-xl font-bold mt-3"
          style={{ color: C.text }}
        >
          Contemporary Dining Room
        </h3>

        <p
          className="text-sm mt-2"
          style={{ color: C.textMuted }}
        >
          Beautiful dining furniture perfect for family gatherings.
        </p>
      </div>
    </div>

  </div>
</section>

          {/* ── Why Choose Us ── */}
<section
  className="container mx-auto px-4 py-16"
>
  <div className="text-center mb-12">
    <h2
      className="text-3xl font-bold"
      style={{ color: C.text }}
    >
      Why Choose Us
    </h2>

    <p
      className="mt-3 text-sm"
      style={{ color: C.textMuted }}
    >
      We are committed to delivering premium furniture and an exceptional shopping experience.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

    {/* Free Delivery */}
    <div
      className="text-center p-6 rounded-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
      style={{
        background: C.card,
        border: `1px solid ${C.divider}`,
      }}
    >
      <TbTruck
        className="mx-auto mb-4"
        size={42}
        style={{ color: C.accent }}
      />
      <h3 className="font-semibold mb-2">
        Free Delivery
      </h3>
      <p
        className="text-sm"
        style={{ color: C.textMuted }}
      >
        Fast and reliable delivery on selected orders.
      </p>
    </div>

    {/* Secure Payments */}
    <div
      className="text-center p-6 rounded-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
      style={{
        background: C.card,
        border: `1px solid ${C.divider}`,
      }}
    >
      <TbLock
        className="mx-auto mb-4"
        size={42}
        style={{ color: C.accent }}
      />
      <h3 className="font-semibold mb-2">
        Secure Payments
      </h3>
      <p
        className="text-sm"
        style={{ color: C.textMuted }}
      >
        Safe checkout with trusted payment methods.
      </p>
    </div>

    {/* Premium Quality */}
    <div
      className="text-center p-6 rounded-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
      style={{
        background: C.card,
        border: `1px solid ${C.divider}`,
      }}
    >
      <TbStar
        className="mx-auto mb-4"
        size={42}
        style={{ color: C.accent }}
      />
      <h3 className="font-semibold mb-2">
        Premium Quality
      </h3>
      <p
        className="text-sm"
        style={{ color: C.textMuted }}
      >
        Carefully selected furniture crafted to last.
      </p>
    </div>

    {/* Easy Returns */}
    <div
      className="text-center p-6 rounded-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
      style={{
        background: C.card,
        border: `1px solid ${C.divider}`,
      }}
    >
      <TbRefresh
        className="mx-auto mb-4"
        size={42}
        style={{ color: C.accent }}
      />
      <h3 className="font-semibold mb-2">
        Easy Returns
      </h3>
      <p
        className="text-sm"
        style={{ color: C.textMuted }}
      >
        Hassle-free returns within 30 days.
      </p>
    </div>

    {/* 24/7 Support */}
    <div
      className="text-center p-6 rounded-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
      style={{
        background: C.card,
        border: `1px solid ${C.divider}`,
      }}
    >
      <TbHeadset
        className="mx-auto mb-4"
        size={42}
        style={{ color: C.accent }}
      />
      <h3 className="font-semibold mb-2">
        24/7 Support
      </h3>
      <p
        className="text-sm"
        style={{ color: C.textMuted }}
      >
        Our team is always ready to help you.
      </p>
    </div>

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