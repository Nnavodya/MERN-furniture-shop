import React from 'react'
import { TbBrandInstagram, TbBrandFacebook, TbPhone, TbMapPin } from 'react-icons/tb';

const Topbar = () => {
  return (
    <div style={{ background: '#F5EDE0', color: '#5C3D1E', borderBottom: '1px solid rgba(139,94,46,0.15)' }}>
      <div className="container mx-auto px-4 py-2 flex items-center justify-between flex-wrap gap-2">

        {/* Left - Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="flex items-center gap-1.5 transition-colors text-sm"
            style={{ color: '#7A5229' }}
            onMouseEnter={e => e.currentTarget.style.color = '#4A2E0E'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A5229'}
          >
            <TbBrandInstagram className="h-4 w-4" />
            <span className="hidden sm:inline">Instagram</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 transition-colors text-sm"
            style={{ color: '#7A5229' }}
            onMouseEnter={e => e.currentTarget.style.color = '#4A2E0E'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A5229'}
          >
            <TbBrandFacebook className="h-4 w-4" />
            <span className="hidden sm:inline">Facebook</span>
          </a>
        </div>

        {/* Center - Promo */}
        <div className="text-sm font-medium tracking-wide" style={{ color: '#8B5E2E' }}>
          🚚 Free delivery on orders over $100
        </div>

        {/* Right - Contact & Store */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+1234567890"
            className="flex items-center gap-1.5 transition-colors text-sm"
            style={{ color: '#7A5229' }}
            onMouseEnter={e => e.currentTarget.style.color = '#4A2E0E'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A5229'}
          >
            <TbPhone className="h-4 w-4" />
            <span className="hidden md:inline">+1 234 567 890</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 transition-colors text-sm"
            style={{ color: '#7A5229' }}
            onMouseEnter={e => e.currentTarget.style.color = '#4A2E0E'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A5229'}
          >
            <TbMapPin className="h-4 w-4" />
            <span className="hidden md:inline">Find a Store</span>
          </a>
        </div>

      </div>
    </div>
  )
}

export default Topbar;
