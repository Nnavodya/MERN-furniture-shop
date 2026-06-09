import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  TbTrash, TbPlus, TbMinus, TbShoppingCart,
  TbArrowRight, TbTag, TbTruck, TbShieldCheck
} from 'react-icons/tb'

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

// ── Single Cart Item Row ───────────────────────────────
const CartItem = ({ item, onUpdateQty, onRemove }) => (
  <div
    className="flex items-center gap-4 p-4 rounded-xl transition-all"
    style={{ background: C.card, border: `1px solid ${C.divider}` }}
    onMouseEnter={e => e.currentTarget.style.borderColor = C.accentBorder}
    onMouseLeave={e => e.currentTarget.style.borderColor = C.divider}
  >
    {/* Product image */}
    <div
      className="w-20 h-20 rounded-lg flex items-center justify-center text-3xl shrink-0"
      style={{ background: C.accentLight }}
    >
      {item.emoji || '🪑'}
    </div>

    {/* Product info */}
    <div className="flex-1 min-w-0">
      <Link to={`/products/${item.id}`}>
        <h3
          className="font-semibold text-sm mb-0.5 transition-colors"
          style={{ color: C.text }}
          onMouseEnter={e => e.currentTarget.style.color = C.accent}
          onMouseLeave={e => e.currentTarget.style.color = C.text}
        >
          {item.name}
        </h3>
      </Link>
      {item.category && (
        <p className="text-xs mb-1" style={{ color: C.textMuted }}>
          {item.category}
        </p>
      )}
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
        onClick={() => onUpdateQty(item.id, -1)}
        className="p-1 rounded transition-colors"
        style={{ color: C.accent }}
        onMouseEnter={e => e.currentTarget.style.background = C.accentLight}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <TbMinus className="h-3.5 w-3.5" />
      </button>
      <span className="text-sm font-bold w-5 text-center" style={{ color: C.text }}>
        {item.qty}
      </span>
      <button
        onClick={() => onUpdateQty(item.id, +1)}
        className="p-1 rounded transition-colors"
        style={{ color: C.accent }}
        onMouseEnter={e => e.currentTarget.style.background = C.accentLight}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <TbPlus className="h-3.5 w-3.5" />
      </button>
    </div>

    {/* Line total */}
    <p className="text-sm font-bold w-24 text-right shrink-0" style={{ color: C.text }}>
      ${(item.price * item.qty).toLocaleString()}
    </p>

    {/* Remove button */}
    <button
      onClick={() => onRemove(item.id)}
      className="p-2 rounded-lg transition-all shrink-0"
      style={{ color: C.textMuted, border: `1px solid ${C.divider}` }}
      onMouseEnter={e => {
        e.currentTarget.style.color       = '#E53935'
        e.currentTarget.style.borderColor = '#E53935'
        e.currentTarget.style.background  = 'rgba(229,57,53,0.06)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color       = C.textMuted
        e.currentTarget.style.borderColor = C.divider
        e.currentTarget.style.background  = 'transparent'
      }}
    >
      <TbTrash className="h-4 w-4" />
    </button>
  </div>
)

// ── Order Summary Panel ────────────────────────────────
const OrderSummary = ({ items }) => {
  const [coupon,      setCoupon]     = useState('')
  const [discount,    setDiscount]   = useState(0)
  const [couponMsg,   setCouponMsg]  = useState('')
  const [couponColor, setCouponColor] = useState('')

  const subtotal    = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const discountAmt = Math.round(subtotal * discount / 100)
  const shipping    = subtotal - discountAmt >= 100 ? 0 : 25
  const total       = subtotal - discountAmt + shipping

  // Free shipping progress
  const progress = Math.min(((subtotal - discountAmt) / 100) * 100, 100)

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'FURNI20') {
      setDiscount(20)
      setCouponMsg('✓ 20% discount applied!')
      setCouponColor('#2E7D32')
    } else if (coupon.toUpperCase() === 'WELCOME10') {
      setDiscount(10)
      setCouponMsg('✓ 10% discount applied!')
      setCouponColor('#2E7D32')
    } else {
      setDiscount(0)
      setCouponMsg('✗ Invalid coupon code.')
      setCouponColor('#E53935')
    }
  }

  return (
    <div
      className="rounded-xl p-5 sticky top-24"
      style={{ background: C.card, border: `1px solid ${C.divider}` }}
    >
      <h2 className="text-base font-bold mb-4" style={{ color: C.text }}>
        Order Summary
      </h2>

      {/* Free shipping progress */}
      {shipping > 0 ? (
        <div
          className="mb-4 p-3 rounded-lg"
          style={{ background: C.accentLight, border: `1px solid ${C.accentBorder}` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TbTruck className="h-4 w-4" style={{ color: C.accent }} />
            <p className="text-xs" style={{ color: C.textMuted }}>
              Add <span style={{ color: C.accent, fontWeight: 700 }}>
                ${100 - (subtotal - discountAmt)}
              </span> more for free shipping
            </p>
          </div>
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: '5px', background: 'rgba(139,94,46,0.15)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: C.accent }}
            />
          </div>
        </div>
      ) : (
        <div
          className="mb-4 p-3 rounded-lg flex items-center gap-2"
          style={{ background: 'rgba(46,125,50,0.08)', border: '1px solid rgba(46,125,50,0.2)' }}
        >
          <TbTruck className="h-4 w-4" style={{ color: '#2E7D32' }} />
          <p className="text-xs font-medium" style={{ color: '#2E7D32' }}>
            🎉 You've unlocked free shipping!
          </p>
        </div>
      )}

      {/* Coupon code */}
      <div className="mb-4">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ border: `1px solid ${C.accentBorder}`, background: C.accentLight }}
        >
          <TbTag className="h-4 w-4 shrink-0" style={{ color: C.accent }} />
          <input
            type="text"
            placeholder="Coupon code (FURNI20)"
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyCoupon()}
            className="bg-transparent border-none outline-none text-xs flex-1"
            style={{ color: C.text }}
          />
          <button
            onClick={applyCoupon}
            className="text-xs font-semibold px-2 py-1 rounded transition-all"
            style={{ color: C.accent }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,94,46,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            Apply
          </button>
        </div>
        {couponMsg && (
          <p className="text-xs px-1 mt-1" style={{ color: couponColor }}>
            {couponMsg}
          </p>
        )}
      </div>

      {/* Price breakdown */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between text-sm" style={{ color: C.textMuted }}>
          <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
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
          <span style={{ color: shipping === 0 ? '#2E7D32' : C.textMuted }}>
            {shipping === 0 ? 'Free' : `$${shipping}`}
          </span>
        </div>
        <div
          className="flex justify-between text-base font-bold pt-3"
          style={{ color: C.text, borderTop: `1px solid ${C.divider}` }}
        >
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>

      {/* Checkout button */}
      <Link
        to="/checkout"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all mb-2"
        style={{ background: C.accent, color: '#FFFFFF' }}
        onMouseEnter={e => e.currentTarget.style.background = '#7A5229'}
        onMouseLeave={e => e.currentTarget.style.background = C.accent}
      >
        Proceed to Checkout <TbArrowRight className="h-4 w-4" />
      </Link>

      {/* Trust badges */}
      <div
        className="flex items-center justify-center gap-2 pt-3 mt-1"
        style={{ borderTop: `1px solid ${C.divider}` }}
      >
        <TbShieldCheck className="h-3.5 w-3.5" style={{ color: C.textMuted }} />
        <p className="text-xs" style={{ color: C.textMuted }}>
          Secure checkout · SSL encrypted
        </p>
      </div>
    </div>
  )
}

// ── CartContents (main export) ─────────────────────────
const CartContents = ({ items = [], onUpdateQty, onRemove }) => {

  // Empty cart state
  if (items.length === 0) return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
        style={{ background: C.accentLight }}
      >
        🛒
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: C.text }}>
          Your cart is empty
        </h2>
        <p className="text-sm" style={{ color: C.textMuted }}>
          Looks like you haven't added anything yet.
        </p>
      </div>
      <Link
        to="/products"
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
        style={{ background: C.accent, color: '#FFFFFF' }}
        onMouseEnter={e => e.currentTarget.style.background = '#7A5229'}
        onMouseLeave={e => e.currentTarget.style.background = C.accent}
      >
        Start Shopping <TbArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )

  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* ── Left: Items list ── */}
      <div className="flex-1 flex flex-col gap-3">

        {/* Column headers */}
        <div
          className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 pb-2 text-xs font-semibold"
          style={{ color: C.textMuted, borderBottom: `1px solid ${C.divider}` }}
        >
          <span>Product</span>
          <span className="text-center">Quantity</span>
          <span className="text-right">Total</span>
          <span></span>
        </div>

        {/* Items */}
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQty={onUpdateQty}
            onRemove={onRemove}
          />
        ))}

        {/* Continue shopping */}
        <Link
          to="/products"
          className="flex items-center gap-1.5 text-sm font-medium mt-2 w-fit transition-opacity"
          style={{ color: C.accent }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          ← Continue Shopping
        </Link>
      </div>

      {/* ── Right: Order summary ── */}
      <div className="w-full lg:w-80 shrink-0">
        <OrderSummary items={items} />
      </div>

    </div>
  )
}

export default CartContents;