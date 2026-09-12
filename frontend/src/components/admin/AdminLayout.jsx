import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  TbLayoutDashboard, TbPackage, TbShoppingBag,
  TbLogout, TbMenu2, TbX, TbHome,
} from 'react-icons/tb'
import { useAuth } from '../../context/AuthContext'

const C = {
  bg:       '#1C0F05',
  sidebar:  '#150B03',
  accent:   '#D4A373',
  text:     '#F5EDE0',
  textMuted:'rgba(245,237,224,0.5)',
  divider:  'rgba(212,163,115,0.15)',
  active:   'rgba(212,163,115,0.12)',
}

const navItems = [
  { to: '/admin/dashboard', icon: TbLayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products',  icon: TbPackage,         label: 'Products'  },
  { to: '/admin/orders',    icon: TbShoppingBag,     label: 'Orders'    },
]

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const Sidebar = () => (
    <aside
      className="flex flex-col h-full"
      style={{ background: C.sidebar, borderRight: `1px solid ${C.divider}` }}
    >
      {/* Logo */}
      <div className="px-6 py-5" style={{ borderBottom: `1px solid ${C.divider}` }}>
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold" style={{ color: C.accent }}>Furni</span>
          <span className="text-lg font-bold" style={{ color: C.text }}>Hub</span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded ml-1"
            style={{ background: 'rgba(212,163,115,0.2)', color: C.accent }}
          >
            ADMIN
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = pathname === to
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
              style={{
                background: active ? C.active : 'transparent',
                color:      active ? C.accent : C.textMuted,
                fontWeight: active ? 600 : 400,
                borderLeft: active ? `2px solid ${C.accent}` : '2px solid transparent',
              }}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-4 py-4" style={{ borderTop: `1px solid ${C.divider}` }}>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex items-center justify-center rounded-full text-xs font-bold shrink-0"
            style={{ width: '32px', height: '32px', background: 'rgba(212,163,115,0.2)', color: C.accent }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: C.text }}>{user?.name}</p>
            <p className="text-[10px] truncate" style={{ color: C.textMuted }}>{user?.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg text-xs transition-all"
            style={{ background: 'rgba(245,237,224,0.06)', color: C.textMuted }}
          >
            <TbHome className="h-3.5 w-3.5" /> Store
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg text-xs transition-all"
            style={{ background: 'rgba(229,57,53,0.1)', color: '#E57373' }}
          >
            <TbLogout className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: C.bg }}>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-56 shrink-0 flex-col">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-56 flex flex-col">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div
          className="lg:hidden flex items-center gap-3 px-4 py-3 shrink-0"
          style={{ background: C.sidebar, borderBottom: `1px solid ${C.divider}` }}
        >
          <button onClick={() => setSidebarOpen(true)} style={{ color: C.textMuted }}>
            <TbMenu2 className="h-5 w-5" />
          </button>
          <span className="text-sm font-bold" style={{ color: C.accent }}>FurniHub Admin</span>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout;