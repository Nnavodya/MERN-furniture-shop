import React from 'react'
import { Link } from 'react-router-dom'
import { TbLeaf, TbAward, TbTruck, TbHeartHandshake, TbArrowRight } from 'react-icons/tb'

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

const values = [
  { icon: TbAward,          title: 'Craftsmanship',  desc: 'Every piece is built by skilled artisans using premium, sustainably sourced materials.' },
  { icon: TbLeaf,           title: 'Sustainability', desc: 'We partner with certified suppliers committed to responsible forestry and production.'   },
  { icon: TbTruck,          title: 'Reliability',    desc: 'White-glove delivery, careful packaging, and on-time service — every single order.'      },
  { icon: TbHeartHandshake, title: 'Customer First', desc: 'Real support from real people, before and after your purchase.'                          },
]

const stats = [
  { value: '500+',  label: 'Products'        },
  { value: '10k+',  label: 'Happy Customers' },
  { value: '4.9★',  label: 'Average Rating'  },
  { value: '8 yrs', label: 'In Business'     },
]

const About = () => (
  <div style={{ background: C.bg, minHeight: '100vh' }}>

    {/* ── Hero ── */}
    <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: C.accent }}>
        Our Story
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: C.text }}>
        Furniture that feels like home
      </h1>
      <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>
        FurniHub started with a simple idea: furniture should be beautiful, built to last, and
        accessible without compromise. What began as a small workshop has grown into a trusted
        destination for thoughtfully designed pieces — sourced responsibly and delivered with care.
      </p>
    </div>

    {/* ── Stats ── */}
    <div className="container mx-auto px-4 pb-16">
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl p-8"
        style={{ background: C.accent }}
      >
        {stats.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#D4A373' }}>{value}</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>{label}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ── Values ── */}
    <div className="container mx-auto px-4 pb-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold" style={{ color: C.text }}>What We Stand For</h2>
        <p className="text-sm mt-2" style={{ color: C.textMuted }}>
          The values that guide every product we make and every order we ship.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {values.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-200"
            style={{ background: C.card, border: `1px solid ${C.divider}` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.accentBorder; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.divider; e.currentTarget.style.transform = 'none' }}
          >
            <div
              className="flex items-center justify-center h-12 w-12 rounded-2xl mb-4"
              style={{ background: C.accentLight, border: `1px solid ${C.accentBorder}` }}
            >
              <Icon className="h-6 w-6" style={{ color: C.accent }} />
            </div>
            <h3 className="text-sm font-bold mb-2" style={{ color: C.text }}>{title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ── CTA ── */}
    <div className="container mx-auto px-4 pb-16 text-center">
      <h2 className="text-xl font-bold mb-4" style={{ color: C.text }}>
        Ready to find your next favorite piece?
      </h2>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
        style={{ background: C.accent, color: '#FFFFFF' }}
        onMouseEnter={e => e.currentTarget.style.background = '#7A5229'}
        onMouseLeave={e => e.currentTarget.style.background = C.accent}
      >
        Shop the Collection <TbArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </div>
)

export default About;