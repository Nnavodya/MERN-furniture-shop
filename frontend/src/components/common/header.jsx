import React, { useState } from 'react'
import Topbar from '../layout/Topbar'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  TbArmchair, TbLayoutGrid, TbHome, TbTag,
  TbInfoCircle, TbMail, TbSearch, TbHeart,
  TbShoppingCart, TbUser, TbChevronDown, TbX, TbMenu2
} from 'react-icons/tb'

// ── Design Tokens (Light Theme) ────────────────────────
const C = {
  topbarBg:     '#F5EDE0',
  topbarText:   '#5C3D1E',
  topbarPromo:  '#8B5E2E',
  navBg:        '#FFFFFF',
  navSecondary: '#FBF7F2',
  accent:       '#8B5E2E',
  accentMid:    'rgba(139,94,46,0.08)',
  accentBorder: 'rgba(139,94,46,0.20)',
  text:         '#2C1A0E',
  textNav:      '#3D2410',
  textMuted:    'rgba(44,26,14,0.55)',
  divider:      'rgba(139,94,46,0.12)',
  shadow:       '0 2px 16px rgba(44,26,14,0.08)',
}

const categories = [
  { label: 'Living Room',         path: 'living-room' },
  { label: 'Bedroom',             path: 'bedroom'     },
  { label: 'Dining Room',         path: 'dining'      },
  { label: 'Office',              path: 'office'      },
  { label: 'Outdoor',             path: 'outdoor'     },
  { label: 'Storage',             path: 'storage'     },
  { label: 'Lighting',            path: 'lighting'    },
  { label: 'Decor & Accessories', path: 'decor'       },
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
        color:        active ? C.accent    : C.textNav,
        opacity:      active ? 1           : 0.75,
        background:   active ? C.accentMid : 'transparent',
        borderBottom: active ? `3px solid ${C.accent}` : '3px solid transparent',
        boxShadow:    active ? `0 4px 15px rgba(139,94,46,.10)` : 'none',
        fontWeight:   active ? '600' : '400',
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
          e.currentTarget.style.opacity    = '0.75'
          e.currentTarget.style.color      = C.textNav
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
// onClick prop තිබුනොත් → drawer open (navigate නොකරයි)
// onClick prop නැත්නම් → සාමාන්‍ය Link navigate
const IconBtn = ({ to, label, icon: Icon, count, onClick }) => (
  <Link
    to={onClick ? '#' : to}
    aria-label={label}
    onClick={e => {
      if (onClick) {
        e.preventDefault()
        onClick()
      }
    }}
    className="relative p-2 rounded-lg flex items-center justify-center transition-all duration-150"
    style={{ border: `0.5px solid ${C.accentBorder}`, color: C.textNav, opacity: 0.7 }}
    onMouseEnter={e => {
      e.currentTarget.style.background  = C.accentMid
      e.currentTarget.style.borderColor = C.accent
      e.currentTarget.style.color       = C.accent
      e.currentTarget.style.opacity     = '1'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background  = 'transparent'
      e.currentTarget.style.borderColor = C.accentBorder
      e.currentTarget.style.color       = C.textNav
      e.currentTarget.style.opacity     = '0.7'
    }}
  >
    <Icon className="h-5 w-5" />
    {count > 0 && (
      <span
        style={{
          position:       'absolute',
          top:            '-8px',
          right:          '-8px',
          background:     '#E53935',
          color:          '#FFFFFF',
          fontSize:       '10px',
          fontWeight:     '700',
          borderRadius:   '50%',
          height:         '18px',
          width:          '18px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          lineHeight:     1,
          boxShadow:      '0 0 0 2px #FFFFFF',
          pointerEvents:  'none',
        }}
      >
        {count > 99 ? '99+' : count}
      </span>
    )}
  </Link>
)

// ── Account Button — login state aware ──────────────────
// Logged in  → avatar initial, links to /account
// Logged out → user icon, links to /login
const AccountBtn = () => {
  const { user, isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <Link
        to="/account"
        aria-label="Account"
        className="relative flex items-center justify-center rounded-full transition-all duration-150 shrink-0"
        style={{
          width: '36px', height: '36px',
          background: C.accentMid,
          border: `1.5px solid ${C.accent}`,
          color: C.accent,
          fontSize: '13px',
          fontWeight: 700,
        }}
        title={user.name}
      >
        {user.name.charAt(0).toUpperCase()}
      </Link>
    )
  }

  return (
    <IconBtn to="/login" label="Login" icon={TbUser} count={0} />
  )
}

// ── Header ─────────────────────────────────────────────
// CartContext remove කළා — App.jsx props විදිහට pass කරනවා
const Header = ({ cartCount = 0, wishlistCount = 0, onCartClick }) => {
  const [menuOpen,     setMenuOpen] = useState(false)
  const [showDropdown, setDropdown] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <>
      <Topbar />

      <header
        style={{
          background:   C.navBg,
          color:        C.text,
          boxShadow:    C.shadow,
          borderBottom: `1px solid ${C.divider}`,
        }}
        className="sticky top-0 z-50"
      >
        {/* ── Main Row ── */}
        <div className="container mx-auto px-4 flex items-center justify-between h-[70px] gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 no-underline">
            <TbArmchair
              className="h-8 w-8"
              style={{ color: C.accent, filter: 'drop-shadow(0 0 4px rgba(139,94,46,.25))' }}
            />
            <span className="text-2xl font-bold tracking-wide" style={{ color: C.text }}>
              Furni<span style={{ color: C.accent }}>Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink to="/" icon={TbHome}>Home</NavLink>

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
                    background: '#FFFFFF',
                    border:     `0.5px solid ${C.accentBorder}`,
                    boxShadow:  '0 8px 24px rgba(44,26,14,0.10)',
                  }}
                >
                  {categories.map(cat => (
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
            <div
              className="hidden md:flex items-center rounded-lg px-3 py-2 gap-2"
              style={{ background: C.navSecondary, border: `0.5px solid ${C.accentBorder}` }}
            >
              <TbSearch className="h-4 w-4 shrink-0" style={{ color: C.accent }} />
              <input
                type="text"
                placeholder="Search sofas, tables, chairs..."
                className="bg-transparent border-none outline-none text-sm w-40"
                style={{ color: C.text }}
              />
            </div>

            <IconBtn
              to="/wishlist"
              label="Wishlist"
              icon={TbHeart}
              count={wishlistCount}
            />

            {/* Cart icon — onCartClick drawer open කරනවා */}
            <IconBtn
              to="/cart"
              label="Cart"
              icon={TbShoppingCart}
              count={cartCount}
              onClick={onCartClick}
            />

            {/* Account — login state aware */}
            <AccountBtn />

            <button
              className="lg:hidden p-2 rounded-lg"
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
                  <span className="text-xs" style={{ color: 'rgba(139,94,46,0.25)' }}>·</span>
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
            <span className="text-xs" style={{ color: 'rgba(139,94,46,0.25)' }}>·</span>
            <Link
              to="/products?filter=new"
              className="text-xs px-2 py-1 font-medium whitespace-nowrap"
              style={{ color: C.accent }}
            >
              ✨ New Arrivals
            </Link>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div
            className="lg:hidden px-4 py-4 space-y-1"
            style={{ borderTop: `1px solid ${C.divider}`, background: C.navBg }}
          >
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
                style={{ color: C.textNav, opacity: 0.75 }}
                onMouseEnter={e => {
                  e.currentTarget.style.color      = C.accent
                  e.currentTarget.style.background = C.accentMid
                  e.currentTarget.style.opacity    = '1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color      = C.textNav
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.opacity    = '0.75'
                }}
              >
                <Icon className="h-4 w-4" /> {label}
              </Link>
            ))}

            {/* Mobile — Account / Login + Logout */}
            <div className="pt-3" style={{ borderTop: `1px solid ${C.divider}` }}>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm"
                    style={{ color: C.textNav, opacity: 0.75 }}
                  >
                    <TbUser className="h-4 w-4" /> {user.name}
                  </Link>
                  <button
                    onClick={() => { logout(); setMenuOpen(false) }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm w-full text-left"
                    style={{ color: '#E53935' }}
                  >
                    <TbX className="h-4 w-4" /> Log Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm"
                  style={{ color: C.accent, fontWeight: 600 }}
                >
                  <TbUser className="h-4 w-4" /> Log In / Sign Up
                </Link>
              )}
            </div>

            <div className="pt-3" style={{ borderTop: `1px solid ${C.divider}` }}>
              <p className="text-xs px-3 mb-2" style={{ color: C.accent, opacity: 0.8 }}>
                Categories
              </p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map(cat => (
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