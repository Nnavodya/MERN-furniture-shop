import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TbTrash, TbPlus, TbMinus, TbShoppingCart, TbArrowRight, TbTag } from 'react-icons/tb'

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

// Placeholder cart items
const initialItems = [
  { id: 1, name: 'Linen Sofa',         price: 899,  qty: 1, emoji: '🛋️' },
  { id: 2, name: 'Oak Dining Table',   price: 1299, qty: 2, emoji: '🪑' },
  { id: 3, name: 'Velvet Armchair',    price: 549,  qty: 1, emoji: '🪑' },
]

const Cart = () => {
  const [items, setItems]       = useState(initialItems)
  const [coupon, setCoupon]     = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponMsg, setCouponMsg] = useState('')

  const updateQty = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    )
  }

  const removeItem = (id) => setItems(prev => prev.filter(item => item.id !== id))

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'FURNI20') {
      setDiscount(20)
      setCouponMsg('20% discount applied!')
    } else {
      setDiscount(0)
      setCouponMsg('Invalid coupon code.')
    }
  }

  const subtotal  = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const discountAmt = Math.round(subtotal * discount / 100)
  const shipping  = subtotal > 100 ? 0 : 25
  const total     = subtotal - discountAmt + shipping

  // Empty cart
  if (items.length === 0) return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-5 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
          style={{ background: C.accentLight }}
        >
          🛒
        </div>
        <h2 className="text-2xl font-bold" style={{ color: C.text }}>Your cart is empty</h2>
        <p className="text-sm" style={{ color: C.textMuted }}>
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
          style={{ background: C.accent, color: '#FFFFFF' }}
        >
          Start Shopping <TbArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-8">

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: C.text }}>Your Cart</h1>
          <p className="text-sm mt-1" style={{ color: C.textMuted }}>
            {items.reduce((s, i) => s + i.qty, 0)} items
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Cart Items ── */}
          <div className="flex-1 flex flex-col gap-3">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: C.card, border: `1px solid ${C.divider}` }}
              >
                {/* Image placeholder */}
                <div
                  className="w-20 h-20 rounded-lg flex items-center justify-center text-3xl shrink-0"
                  style={{ background: C.accentLight }}
                >
                  {item.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1" style={{ color: C.text }}>
                    {item.name}
                  </h3>
                  <p className="text-sm font-bold" style={{ color: C.accent }}>
                    ${item.price.toLocaleString()}
                  </p>
                </div>

                {/* Qty controls */}
                <div
                  className="flex items-center gap-2 px-2 py-1 rounded-lg"
                  style={{ border: `1px solid ${C.accentBorder}` }}
                >
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="p-1 rounded transition-colors"
                    style={{ color: C.accent }}
                    onMouseEnter={e => e.currentTarget.style.background = C.accentLight}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <TbMinus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center" style={{ color: C.text }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, +1)}
                    className="p-1 rounded transition-colors"
                    style={{ color: C.accent }}
                    onMouseEnter={e => e.currentTarget.style.background = C.accentLight}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <TbPlus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Line total */}
                <p className="text-sm font-bold w-20 text-right shrink-0" style={{ color: C.text }}>
                  ${(item.price * item.qty).toLocaleString()}
                </p>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 rounded-lg transition-colors shrink-0"
                  style={{ color: C.textMuted, border: `1px solid ${C.divider}` }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#E53935'
                    e.currentTarget.style.borderColor = '#E53935'
                    e.currentTarget.style.background = 'rgba(229,57,53,0.06)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = C.textMuted
                    e.currentTarget.style.borderColor = C.divider
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <TbTrash className="h-4 w-4" />
                </button>
              </div>
            ))}

            {/* Continue shopping */}
            <Link
              to="/products"
              className="flex items-center gap-2 text-sm font-medium mt-2 w-fit transition-opacity"
              style={{ color: C.accent }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* ── Order Summary ── */}
          <div className="w-full lg:w-80 shrink-0">
            <div
              className="rounded-xl p-5 sticky top-24"
              style={{ background: C.card, border: `1px solid ${C.divider}` }}
            >
              <h2 className="text-base font-bold mb-4" style={{ color: C.text }}>
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="mb-4">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg mb-1"
                  style={{ border: `1px solid ${C.accentBorder}`, background: C.accentLight }}
                >
                  <TbTag className="h-4 w-4 shrink-0" style={{ color: C.accent }} />
                  <input
                    type="text"
                    placeholder="Coupon code (try FURNI20)"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    className="bg-transparent border-none outline-none text-xs flex-1"
                    style={{ color: C.text }}
                  />
                  <button
                    onClick={applyCoupon}
                    className="text-xs font-semibold transition-colors"
                    style={{ color: C.accent }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p
                    className="text-xs px-1"
                    style={{ color: discount > 0 ? '#2E7D32' : '#E53935' }}
                  >
                    {couponMsg}
                  </p>
                )}
              </div>

              {/* Price breakdown */}
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex justify-between text-sm" style={{ color: C.textMuted }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm" style={{ color: '#2E7D32' }}>
                    <span>Discount ({discount}%)</span>
                    <span>−${discountAmt.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm" style={{ color: C.textMuted }}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div
                  className="flex justify-between text-base font-bold pt-3 mt-1"
                  style={{ color: C.text, borderTop: `1px solid ${C.divider}` }}
                >
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout button */}
              <Link
                to="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all"
                style={{ background: C.accent, color: '#FFFFFF' }}
                onMouseEnter={e => e.currentTarget.style.background = '#7A5229'}
                onMouseLeave={e => e.currentTarget.style.background = C.accent}
              >
                Proceed to Checkout <TbArrowRight className="h-4 w-4" />
              </Link>

              {/* Free shipping note */}
              {shipping > 0 && (
                <p className="text-xs text-center mt-3" style={{ color: C.textMuted }}>
                  Add ${(100 - subtotal + discountAmt).toLocaleString()} more for free shipping
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;