import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { TbShoppingBag, TbChevronDown, TbArrowRight } from 'react-icons/tb'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

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

const statusColors = {
  pending:    { bg: 'rgba(255,193,7,0.12)',  text: '#B8860B' },
  processing: { bg: 'rgba(33,150,243,0.12)', text: '#1565C0' },
  shipped:    { bg: 'rgba(156,39,176,0.12)', text: '#6A1B9A' },
  delivered:  { bg: 'rgba(76,175,80,0.12)',  text: '#2E7D32' },
  cancelled:  { bg: 'rgba(244,67,54,0.12)',  text: '#C62828' },
}

const MyOrders = () => {
  const { isAuthenticated } = useAuth()
  const [orders, setOrders]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [expanded, setExpanded] = useState(null)

  // ── Redirect if not logged in ──
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/my-orders' }} replace />
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/orders/my')
        setOrders(data)
      } catch (err) {
        setError('Failed to load your orders.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">

        {/* ── Header ── */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1" style={{ color: C.text }}>My Orders</h1>
          <p className="text-sm" style={{ color: C.textMuted }}>
            {loading ? 'Loading…' : `${orders.length} order${orders.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="text-center py-20" style={{ color: C.textMuted }}>
            <p className="text-sm">Loading your orders…</p>
          </div>
        )}

        {/* ── Error ── */}
        {error && !loading && (
          <div className="text-center py-20" style={{ color: '#C62828' }}>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center text-center py-20 gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: C.accentLight }}
            >
              <TbShoppingBag className="h-7 w-7" style={{ color: C.accent }} />
            </div>
            <div>
              <p className="text-lg font-bold mb-1" style={{ color: C.text }}>No orders yet</p>
              <p className="text-sm" style={{ color: C.textMuted }}>
                When you place an order, it will appear here.
              </p>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
              style={{ background: C.accent, color: '#FFFFFF' }}
            >
              Start Shopping <TbArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* ── Orders List ── */}
        {!loading && !error && orders.length > 0 && (
          <div className="flex flex-col gap-4">
            {orders.map(order => (
              <div
                key={order._id}
                className="rounded-xl overflow-hidden"
                style={{ background: C.card, border: `1px solid ${C.divider}` }}
              >
                {/* Order Header */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer"
                  onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                  style={{ borderBottom: expanded === order._id ? `1px solid ${C.divider}` : 'none' }}
                >
                  <div className="flex items-center gap-4">
                    {/* Order number */}
                    <div>
                      <p className="text-xs font-bold font-mono" style={{ color: C.accent }}>
                        #{order._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: C.textMuted }}>
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </p>
                    </div>

                    {/* Status badge */}
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full capitalize"
                      style={{
                        background: statusColors[order.status]?.bg || C.accentLight,
                        color:      statusColors[order.status]?.text || C.accent,
                      }}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-sm font-bold" style={{ color: C.text }}>
                      ${order.total?.toLocaleString()}
                    </p>
                    <TbChevronDown
                      className="h-4 w-4 transition-transform"
                      style={{
                        color: C.textMuted,
                        transform: expanded === order._id ? 'rotate(180deg)' : 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Expanded details */}
                {expanded === order._id && (
                  <div className="px-5 py-4">

                    {/* Items */}
                    <p className="text-xs font-semibold mb-3" style={{ color: C.textMuted }}>
                      ITEMS
                    </p>
                    <div className="flex flex-col gap-3 mb-4">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                            style={{ background: C.accentLight }}
                          >
                            {item.emoji || '🪑'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate" style={{ color: C.text }}>
                              {item.name}
                            </p>
                            <p className="text-xs" style={{ color: C.textMuted }}>
                              Qty: {item.qty}
                            </p>
                          </div>
                          <p className="text-sm font-bold shrink-0" style={{ color: C.accent }}>
                            ${(item.price * item.qty).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: `1px solid ${C.divider}` }} className="pt-4 mb-4">
                      {/* Shipping address */}
                      <p className="text-xs font-semibold mb-2" style={{ color: C.textMuted }}>
                        SHIPPED TO
                      </p>
                      <p className="text-sm" style={{ color: C.text }}>
                        {order.shippingAddress?.fullName}
                      </p>
                      <p className="text-xs" style={{ color: C.textMuted }}>
                        {order.shippingAddress?.address}, {order.shippingAddress?.city}{' '}
                        {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                      </p>
                    </div>

                    {/* Order summary */}
                    <div
                      className="flex flex-col gap-1.5 pt-3"
                      style={{ borderTop: `1px solid ${C.divider}` }}
                    >
                      <div className="flex justify-between text-xs" style={{ color: C.textMuted }}>
                        <span>Subtotal</span>
                        <span>${order.subtotal?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs" style={{ color: C.textMuted }}>
                        <span>Shipping</span>
                        <span style={{ color: order.shippingCost === 0 ? '#2E7D32' : C.textMuted }}>
                          {order.shippingCost === 0 ? 'Free' : `$${order.shippingCost}`}
                        </span>
                      </div>
                      <div
                        className="flex justify-between text-sm font-bold pt-2"
                        style={{ color: C.text, borderTop: `1px solid ${C.divider}` }}
                      >
                        <span>Total</span>
                        <span>${order.total?.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Payment method */}
                    <p className="text-xs mt-3" style={{ color: C.textMuted }}>
                      Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders;