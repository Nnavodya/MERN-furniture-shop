import React, { useState, useEffect } from 'react'
import { TbSearch, TbChevronDown } from 'react-icons/tb'
import api from '../../api/axios'

const C = {
  bg:       '#1C0F05',
  card:     '#231208',
  accent:   '#D4A373',
  text:     '#F5EDE0',
  textMuted:'rgba(245,237,224,0.5)',
  divider:  'rgba(212,163,115,0.15)',
  border:   'rgba(212,163,115,0.12)',
  input:    '#2C1A0E',
}

const statusColors = {
  pending:    { bg: 'rgba(255,193,7,0.15)',  text: '#FFC107' },
  processing: { bg: 'rgba(33,150,243,0.15)', text: '#42A5F5' },
  shipped:    { bg: 'rgba(156,39,176,0.15)', text: '#CE93D8' },
  delivered:  { bg: 'rgba(76,175,80,0.15)',  text: '#81C784' },
  cancelled:  { bg: 'rgba(244,67,54,0.15)',  text: '#EF9A9A' },
}

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const AdminOrders = () => {
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [error, setError]     = useState('')
  const [expanded, setExpanded] = useState(null)
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/orders')
        setOrders(data)
      } catch (err) {
        setError('Failed to load orders.')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdating(orderId)
    try {
      const { data } = await api.put(`/orders/${orderId}/status`, { status: newStatus })
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: data.status } : o))
    } catch (err) {
      setError('Failed to update order status.')
    } finally {
      setUpdating(null)
    }
  }

  const filtered = orders.filter(o =>
    o._id.includes(search) ||
    o.shippingAddress?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    o.user?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: C.text }}>Orders</h1>
        <p className="text-sm mt-1" style={{ color: C.textMuted }}>{orders.length} total orders</p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-2.5 rounded-lg text-sm" style={{ background: 'rgba(244,67,54,0.1)', color: '#EF9A9A' }}>
          {error}
        </div>
      )}

      {/* Search */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg mb-5 max-w-sm"
        style={{ background: C.card, border: `1px solid ${C.border}` }}
      >
        <TbSearch className="h-4 w-4" style={{ color: C.textMuted }} />
        <input
          type="text" placeholder="Search by name or order ID…"
          value={search} onChange={e => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm w-full"
          style={{ color: C.text }}
        />
      </div>

      {/* Orders Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: C.card, borderBottom: `1px solid ${C.divider}` }}>
                {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Date', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: C.textMuted }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-sm" style={{ color: C.textMuted }}>
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-sm" style={{ color: C.textMuted }}>
                    No orders found
                  </td>
                </tr>
              ) : filtered.map(order => (
                <React.Fragment key={order._id}>
                  <tr style={{ borderBottom: `1px solid ${C.divider}`, background: '#1C0F05' }}>
                    {/* Order ID */}
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: C.accent }}>
                      #{order._id.slice(-6).toUpperCase()}
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold" style={{ color: C.text }}>
                        {order.user?.name || order.shippingAddress?.fullName || '—'}
                      </p>
                      <p className="text-[10px]" style={{ color: C.textMuted }}>
                        {order.shippingAddress?.email}
                      </p>
                    </td>

                    {/* Items count */}
                    <td className="px-4 py-3 text-xs" style={{ color: C.textMuted }}>
                      {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
                    </td>

                    {/* Total */}
                    <td className="px-4 py-3 text-xs font-bold" style={{ color: C.text }}>
                      ${order.total?.toLocaleString()}
                    </td>

                    {/* Payment */}
                    <td className="px-4 py-3 text-xs capitalize" style={{ color: C.textMuted }}>
                      {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card'}
                    </td>

                    {/* Status dropdown */}
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={e => handleStatusUpdate(order._id, e.target.value)}
                        disabled={updating === order._id}
                        className="text-[10px] font-bold px-2 py-1 rounded-full outline-none cursor-pointer"
                        style={{
                          background: statusColors[order.status]?.bg || 'rgba(255,255,255,0.1)',
                          color:      statusColors[order.status]?.text || C.text,
                          border:     'none',
                          opacity:    updating === order._id ? 0.6 : 1,
                        }}
                      >
                        {statusOptions.map(s => (
                          <option key={s} value={s} style={{ background: '#231208', color: C.text }}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-[10px]" style={{ color: C.textMuted }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* Expand toggle */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                        style={{ color: C.textMuted }}
                      >
                        <TbChevronDown
                          className="h-4 w-4 transition-transform"
                          style={{ transform: expanded === order._id ? 'rotate(180deg)' : 'none' }}
                        />
                      </button>
                    </td>
                  </tr>

                  {/* Expanded order items */}
                  {expanded === order._id && (
                    <tr style={{ background: '#200E02', borderBottom: `1px solid ${C.divider}` }}>
                      <td colSpan={8} className="px-6 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Items list */}
                          <div>
                            <p className="text-xs font-semibold mb-2" style={{ color: C.textMuted }}>Items</p>
                            <div className="flex flex-col gap-2">
                              {order.items?.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <span className="text-base">{item.emoji || '🪑'}</span>
                                  <span className="text-xs" style={{ color: C.text }}>{item.name}</span>
                                  <span className="text-xs ml-auto" style={{ color: C.textMuted }}>
                                    x{item.qty} — ${(item.price * item.qty).toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Shipping address */}
                          <div>
                            <p className="text-xs font-semibold mb-2" style={{ color: C.textMuted }}>Shipping Address</p>
                            <p className="text-xs" style={{ color: C.text }}>{order.shippingAddress?.fullName}</p>
                            <p className="text-xs" style={{ color: C.textMuted }}>{order.shippingAddress?.address}</p>
                            <p className="text-xs" style={{ color: C.textMuted }}>
                              {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
                            </p>
                            <p className="text-xs" style={{ color: C.textMuted }}>{order.shippingAddress?.country}</p>
                            <p className="text-xs mt-1" style={{ color: C.textMuted }}>{order.shippingAddress?.phone}</p>
                          </div>
                        </div>

                        {/* Order totals */}
                        <div className="mt-3 pt-3 flex gap-6" style={{ borderTop: `1px solid ${C.divider}` }}>
                          <span className="text-xs" style={{ color: C.textMuted }}>
                            Subtotal: <span style={{ color: C.text }}>${order.subtotal?.toLocaleString()}</span>
                          </span>
                          <span className="text-xs" style={{ color: C.textMuted }}>
                            Shipping: <span style={{ color: C.text }}>
                              {order.shippingCost === 0 ? 'Free' : `$${order.shippingCost}`}
                            </span>
                          </span>
                          <span className="text-xs font-bold" style={{ color: C.accent }}>
                            Total: ${order.total?.toLocaleString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminOrders;