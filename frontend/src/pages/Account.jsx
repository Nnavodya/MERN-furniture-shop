import React from 'react'
import { Navigate, Link } from 'react-router-dom'
import { TbUser, TbMail, TbLogout, TbShoppingBag, TbHeart, TbPackage } from 'react-icons/tb'
import { useAuth } from '../context/AuthContext'

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

const Account = () => {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/account' }} replace />
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-12 max-w-2xl">

        {/* Profile card */}
        <div className="rounded-2xl p-8 mb-6" style={{ background: C.card, border: `1px solid ${C.divider}` }}>
          <div className="flex items-center gap-4 mb-6">
            <div
              className="flex items-center justify-center rounded-full text-xl font-bold shrink-0"
              style={{ width: '64px', height: '64px', background: C.accentLight, color: C.accent }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: C.text }}>{user.name}</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <TbMail className="h-3.5 w-3.5" style={{ color: C.textMuted }} />
                <p className="text-sm" style={{ color: C.textMuted }}>{user.email}</p>
              </div>
              {user.role === 'admin' && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
                  style={{ background: C.accentLight, color: C.accent }}
                >
                  ADMIN
                </span>
              )}
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={{ background: 'rgba(229,57,53,0.08)', color: '#E53935', border: '1px solid rgba(229,57,53,0.2)' }}
          >
            <TbLogout className="h-4 w-4" /> Log Out
          </button>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { to: '/my-orders', icon: TbPackage,     label: 'My Orders'  },
            { to: '/cart',      icon: TbShoppingBag, label: 'My Cart'    },
            { to: '/wishlist',  icon: TbHeart,       label: 'Wishlist'   },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-2 p-6 rounded-xl text-center transition-all"
              style={{ background: C.card, border: `1px solid ${C.divider}` }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.accentBorder}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.divider}
            >
              <Icon className="h-6 w-6" style={{ color: C.accent }} />
              <span className="text-sm font-semibold" style={{ color: C.text }}>{label}</span>
            </Link>
          ))}
        </div>

        {/* Admin link */}
        {user.role === 'admin' && (
          <Link
            to="/admin/dashboard"
            className="flex items-center justify-center gap-2 mt-4 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: C.accent, color: '#FFFFFF' }}
          >
            Go to Admin Panel →
          </Link>
        )}
      </div>
    </div>
  )
}

export default Account;