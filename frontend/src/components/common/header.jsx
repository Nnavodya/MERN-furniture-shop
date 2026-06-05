import React, { useState } from 'react'
import Topbar from '../layout/Topbar'
import { Link, useLocation } from 'react-router-dom'
import {
  TbArmchair, TbLayoutGrid, TbHome, TbTag,
  TbInfoCircle, TbMail, TbSearch, TbHeart,
  TbShoppingCart, TbUser, TbChevronDown, TbX, TbMenu2
} from 'react-icons/tb'

// ── Design Tokens ──────────────────────────────────────
const C = {
  navBg:        '#1B2A4A',   // Navy Blue
  navSecondary: '#253655',   // Slightly lighter navy (search bar, dropdown)
  navHover:     '#2A3F6A',   // Hover state navy
  accent:       '#D4A373',   // Warm Gold (unchanged)
  accentMid:    'rgba(212,163,115,0.12)',
  accentBorder: 'rgba(212,163,115,0.25)',
  text:         '#F5E6D3',   // Soft Beige (unchanged)
  textMuted:    'rgba(232,237,245,0.65)',
  divider:      'rgba(212,163,115,0.10)',
}

const categories = [
  { label: 'Living Room', path: 'living-room' },
  { label: 'Bedroom',     path: 'bedroom'     },
  { label: 'Dining Room', path: 'dining'      },
  { label: 'Office',      path: 'office'      },
  { label: 'Outdoor',     path: 'outdoor'     },
  { label: 'Storage',     path: 'storage'     },
  { label: 'Lighting',    path: 'lighting'    },
  { label: 'Decor & Accessories', path: 'decor' },
]

// ── NavLink ────────────────────────────────────────────
const NavLink = ({ to, icon: Icon, children, dropdown }) => {
  const { pathname } = useLocation()
  const active = pathname === to

  return (
    <Link
      to={to}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all duration-150"
      style={{
        color:        active ? C.accent  : '#E8EDF5',
        opacity:      active ? 1         : 0.7,
        background:   active ? C.accentMid : 'transparent',
        borderBottom: active ? `2px solid ${C.accent}` : '2px solid transparent',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.opacity    = '1'
          e.currentTarget.style.color      = C.accent
          e.currentTarget.style.background = C.accentMid
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.opacity    = '0.7'
          e.currentTarget.style.color      = '#E8EDF5'
          e.currentTarget.style.background = 'transparent'
        }
      }}
    >
      <Icon className="h-4 w-4" />
      {children}
      {dropdown && <TbChevronDown className="h-3 w-3 opacity-60" />}
    </Link>
  )
}

// ── Icon Button ────────────────────────────────────────
const IconBtn = ({ to, label, icon: Icon, count }) => (
  <Link
    to={to}
    aria-label={label}
    className="relative p-2 rounded-lg flex items-center justify-center transition-all duration-150"
    style={{ border: `0.5px solid ${C.accentBorder}`, color: '#E8EDF5', opacity: 0.75 }}
    onMouseEnter={e => {
      e.currentTarget.style.background   = C.accentMid
      e.currentTarget.style.borderColor  = C.accent
      e.currentTarget.style.color        = C.accent
      e.currentTarget.style.opacity      = '1'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background   = 'transparent'
      e.currentTarget.style.borderColor  = C.accentBorder
      e.currentTarget.style.color        = '#E8EDF5'
      e.currentTarget.style.opacity      = '0.75'
    }}
  >
    <Icon className="h-5 w-5" />
    {count > 0 && (
      <span
        className="absolute -top-1.5 -right-1.5 text-[10px] font-bold rounded-full h-[17px] w-[17px] flex items-center justify-center"
        style={{ background: C.accent, color: C.navBg }}
      >
        {count}
      </span>
    )}
  </Link>
)

// ── Header ─────────────────────────────────────────────
const Header = ({ cartCount = 0, wishlistCount = 0 }) => {
  const [menuOpen,     setMenuOpen]  = useState(false)
  const [showDropdown, setDropdown]  = useState(false)

  return (
    <>
      {/* Topbar keeps its original warm brown color */}
      <Topbar />

      <header style={{ background: C.navBg, color: C.text }} className="sticky top-0 z-50">

        {/* ── Main Row ── */}
        <div className="container mx-auto px-4 flex items-center justify-between h-[70px] gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 no-underline">
            <TbArmchair className="h-8 w-8" style={{ color: C.accent }} />
            <span className="text-2xl font-extrabold tracking-tight" style={{ color: C.text }}>
              Furni<span style={{ color: C.accent }}>Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink to="/"        icon={TbHome}>Home</NavLink>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
            >
              <NavLink to="/products" icon={TbLayoutGrid} dropdown>Products</NavLink>

              {showDropdown && (
                <div
                  className="absolute top-full left-0 mt-1 w-52 rounded-xl py-2 z-50"
                  style={{
                    background: C.navSecondary,
                    border: `0.5px solid ${C.accentBorder}`,
                  }}
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.path}
                      to={`/products?category=${cat.path}`}
                      className="block px-4 py-2 text-sm transition-colors duration-100"
                      style={{ color: C.textMuted }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color      = C.accent
                        e.currentTarget.style.background = C.accentMid
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color      = C.textMuted
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/sale"    icon={TbTag}>Sale</NavLink>
            <NavLink to="/about"   icon={TbInfoCircle}>About</NavLink>
            <NavLink to="/contact" icon={TbMail}>Contact</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">

            {/* Search */}
            <div
              className="hidden md:flex items-center rounded-lg px-3 py-2 gap-2 transition-all duration-150"
              style={{
                background: C.navSecondary,
                border: `0.5px solid ${C.accentBorder}`,
              }}
              onFocus={e  => e.currentTarget.style.borderColor = C.accent}
              onBlur={e   => e.currentTarget.style.borderColor = C.accentBorder}
            >
              <TbSearch className="h-4 w-4 shrink-0" style={{ color: C.accent }} />
              <input
                type="text"
                placeholder="Search furniture..."
                className="bg-transparent border-none outline-none text-sm w-32"
                style={{ color: C.text }}
              />
            </div>

            <IconBtn to="/wishlist" label="Wishlist" icon={TbHeart}        count={wishlistCount} />
            <IconBtn to="/cart"     label="Cart"     icon={TbShoppingCart} count={cartCount}     />
            <IconBtn to="/account"  label="Account"  icon={TbUser}         count={0}             />

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ border: `0.5px solid ${C.accentBorder}`, color: C.text }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <TbX className="h-5 w-5" /> : <TbMenu2 className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ── Category Bar ── */}
        <div className="hidden lg:block" style={{ borderTop: `1px solid ${C.divider}` }}>
          <div className="container mx-auto px-4 flex items-center gap-1 h-10 overflow-x-auto scrollbar-none">
            {categories.map((cat, i) => (
              <React.Fragment key={cat.path}>
                {i > 0 && (
                  <span className="text-xs" style={{ color: 'rgba(212,163,115,0.2)' }}>·</span>
                )}
                <Link
                  to={`/products?category=${cat.path}`}
                  className="text-xs px-2 py-1 rounded whitespace-nowrap transition-all duration-150"
                  style={{ color: C.textMuted }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color      = C.accent
                    e.currentTarget.style.background = C.accentMid
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color      = C.textMuted
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {cat.label}
                </Link>
              </React.Fragment>
            ))}
            <span className="text-xs" style={{ color: 'rgba(212,163,115,0.2)' }}>·</span>
            <Link
              to="/products?filter=new"
              className="text-xs px-2 py-1 font-medium whitespace-nowrap"
              style={{ color: C.accent }}
            >
              🔥 New Arrivals
            </Link>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div
            className="lg:hidden px-4 py-4 space-y-1"
            style={{ borderTop: `1px solid ${C.divider}`, background: C.navBg }}
          >
            {/* Mobile Search */}
            <div
              className="flex items-center rounded-lg px-3 py-2 gap-2 mb-3"
              style={{ background: C.navSecondary, border: `0.5px solid ${C.accentBorder}` }}
            >
              <TbSearch className="h-4 w-4" style={{ color: C.accent }} />
              <input
                type="text"
                placeholder="Search furniture..."
                className="bg-transparent border-none outline-none text-sm w-full"
                style={{ color: C.text }}
              />
            </div>

            {/* Mobile Nav Links */}
            {[
              { to: '/',         icon: TbHome,       label: 'Home'     },
              { to: '/products', icon: TbLayoutGrid, label: 'Products' },
              { to: '/sale',     icon: TbTag,        label: 'Sale'     },
              { to: '/about',    icon: TbInfoCircle, label: 'About'    },
              { to: '/contact',  icon: TbMail,       label: 'Contact'  },
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors"
                style={{ color: '#E8EDF5', opacity: 0.75 }}
                onMouseEnter={e => {
                  e.currentTarget.style.color      = C.accent
                  e.currentTarget.style.background = C.accentMid
                  e.currentTarget.style.opacity    = '1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color      = '#E8EDF5'
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.opacity    = '0.75'
                }}
              >
                <Icon className="h-4 w-4" /> {label}
              </Link>
            ))}

            {/* Mobile Categories */}
            <div className="pt-3" style={{ borderTop: `1px solid ${C.divider}` }}>
              <p className="text-xs px-3 mb-2" style={{ color: C.accent, opacity: 0.7 }}>
                Categories
              </p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.path}
                    to={`/products?category=${cat.path}`}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 text-xs rounded transition-colors"
                    style={{ color: C.textMuted }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color      = C.accent
                      e.currentTarget.style.background = C.accentMid
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color      = C.textMuted
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header;