import React from 'react'
import { useCart } from '../context/CartContext'
import CartContents from '../components/cart/CartContents'

const C = {
  bg:       '#FAF7F4',
  text:     '#2C1A0E',
  textMuted:'rgba(44,26,14,0.55)',
  accent:   '#8B5E2E',
  accentLight: 'rgba(139,94,46,0.08)',
  divider:  'rgba(139,94,46,0.12)',
}

const Cart = () => {
  // ── Real cart data — shared with Header badge, CartDrawer, Products page ──
  const { cartItems, updateQty, removeFromCart } = useCart()

  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0)

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-8">

        {/* ── Page Header ── */}
        {cartItems.length > 0 && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold" style={{ color: C.text }}>
              Your Cart
            </h1>
            <p className="text-sm mt-1" style={{ color: C.textMuted }}>
              {totalQty} {totalQty === 1 ? 'item' : 'items'}
            </p>
          </div>
        )}

        {/* ── CartContents component ── */}
        <CartContents
          items={cartItems}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
        />

      </div>
    </div>
  )
}

export default Cart;