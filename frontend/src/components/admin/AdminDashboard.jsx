import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  TbPackage, TbShoppingBag, TbUsers, TbCurrencyDollar,
  TbArrowRight, TbTrendingUp,
} from 'react-icons/tb'
import api from '../../api/axios'

const C = {
  bg:       '#1C0F05',
  card:     '#231208',
  accent:   '#D4A373',
  text:     '#F5EDE0',
  textMuted:'rgba(245,237,224,0.5)',
  divider:  'rgba(212,163,115,0.15)',
  border:   'rgba(212,163,115,0.12)',
}

const statusColors = {
  pending:    { bg: 'rgba(255,193,7,0.15)',  text: '#FFC107' },
  processing: { bg: 'rgba(33,150,243,0.15)', text: '#42A5F5' },
  shipped:    { bg: 'rgba(156,39,176,0.15)', text: '#CE93D8' },
  delivered:  { bg: 'rgba(76,175,80,0.15)',  text: '#81C784' },
  cancelled:  { bg: 'rgba(244,67,54,0.15)',  text: '#EF9A9A' },
}

const AdminDashboard = () => {
  const [stats, setStats]     = useState(null)
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [statsRes, ordersRes] = await Promise.all([
          api.get('/orders/stats'),
          api.get('/orders'),
        ])
        setStats(statsRes.data)
        setOrders(ordersRes.data.slice(0, 5)) // latest 5
      } catch (err) {
        setError('Failed to load dashboard data.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p style={{ color: C.textMuted }}>Loading dashboard…</p>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <p style={{ color: '#EF9A9A' }}>{error}</p>
    </div>
  )

  const statCards = [
    { icon: TbPackage,        label: 'Total Products', value: stats?.totalProducts ?? 0,                          link: '/admin/products' },
    { icon: TbShoppingBag,    label: 'Total Orders',   value: stats?.totalOrders   ?? 0,                          link: '/admin/orders'   },
    { icon: TbUsers,          label: 'Total Users',    value: stats?.totalUsers    ?? 0,                          link: null              },
    { icon: TbCurrencyDollar, label: 'Total Revenue',  value: `$${(stats?.totalRevenue ?? 0).toLocaleString()}`, link: null              },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: C.text }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: C.textMuted }}>FurniHub store overview</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ icon: Icon, label, value, link }) => (
          <div
            key={label}
            className="rounded-xl p-5"
            style={{ background: C.card, border: `1px solid ${C.border}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="p-2 rounded-lg"
                style={{ background: 'rgba(212,163,115,0.12)' }}
              >
                <Icon className="h-5 w-5" style={{ color: C.accent }} />
              </div>
              {link && (
                <Link to={link} style={{ color: C.accent }}>
                  <TbArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            <p className="text-2xl font-bold mb-1" style={{ color: C.text }}>{value}</p>
            <p className="text-xs" style={{ color: C.textMuted }}>{label}</p>
          </div>
        ))}
      </div>

      {/* ── Order Status Breakdown ── */}
      {stats?.statusBreakdown && Object.keys(stats.statusBreakdown).length > 0 && (
        <div
          className="rounded-xl p-5 mb-6"
          style={{ background: C.card, border: `1px solid ${C.border}` }}
        >
          <h2 className="text-sm font-bold mb-4" style={{ color: C.text }}>Order Status Breakdown</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(stats.statusBreakdown).map(([status, count]) => (
              <div
                key={status}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: statusColors[status]?.bg || 'rgba(255,255,255,0.1)',
                  color:      statusColors[status]?.text || C.text,
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}: {count}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Recent Orders ── */}
      <div
        className="rounded-xl p-5"
        style={{ background: C.card, border: `1px solid ${C.border}` }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold" style={{ color: C.text }}>Recent Orders</h2>
          <Link to="/admin/orders" className="text-xs font-medium" style={{ color: C.accent }}>
            View all →
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-sm text-center py-6" style={{ color: C.textMuted }}>No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.divider}` }}>
                  {['Order ID', 'Customer', 'Total', 'Status', 'Date'].map(h => (
                    <th key={h} className="pb-2 text-left font-semibold pr-4" style={{ color: C.textMuted }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} style={{ borderBottom: `1px solid ${C.divider}` }}>
                    <td className="py-2.5 pr-4 font-mono" style={{ color: C.accent }}>
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="py-2.5 pr-4" style={{ color: C.text }}>
                      {order.user?.name || order.shippingAddress?.fullName || '—'}
                    </td>
                    <td className="py-2.5 pr-4 font-semibold" style={{ color: C.text }}>
                      ${order.total?.toLocaleString()}
                    </td>
                    <td className="py-2.5 pr-4">
                      <span
                        className="px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          background: statusColors[order.status]?.bg || 'rgba(255,255,255,0.1)',
                          color:      statusColors[order.status]?.text || C.text,
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2.5" style={{ color: C.textMuted }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard;