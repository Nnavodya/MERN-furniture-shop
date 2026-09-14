import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TbArrowLeft, TbHome, TbSearch } from 'react-icons/tb'

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

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[80vh] text-center">

        {/* 404 number */}
        <p
          className="text-8xl font-bold mb-4 select-none"
          style={{ color: C.accentLight, fontSize: '160px', lineHeight: 1 }}
        >
          404
        </p>

        {/* Emoji */}
        <p className="text-5xl mb-6">🛋️</p>

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-2" style={{ color: C.text }}>
          Page not found
        </h1>
        <p className="text-sm max-w-sm mb-8" style={{ color: C.textMuted }}>
          Looks like this page got lost in the furniture warehouse. Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: C.accentLight,
              color: C.accent,
              border: `1px solid ${C.accentBorder}`,
            }}
          >
            <TbArrowLeft className="h-4 w-4" /> Go Back
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: C.accent, color: '#FFFFFF' }}
            onMouseEnter={e => e.currentTarget.style.background = '#7A5229'}
            onMouseLeave={e => e.currentTarget.style.background = C.accent}
          >
            <TbHome className="h-4 w-4" /> Home
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: C.card,
              color: C.text,
              border: `1px solid ${C.divider}`,
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.accentBorder}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.divider}
          >
            <TbSearch className="h-4 w-4" /> Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound;