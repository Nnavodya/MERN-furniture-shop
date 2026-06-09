import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TbArrowRight } from 'react-icons/tb'
import CartContents from '../components/cart/CartContents'

const C = {
  bg:       '#FAF7F4',
  text:     '#2C1A0E',
  textMuted:'rgba(44,26,14,0.55)',
  accent:   '#8B5E2E',
  accentLight: 'rgba(139,94,46,0.08)',
  divider:  'rgba(139,94,46,0.12)',
}

// ── Placeholder cart items (backend ready වෙද්දී remove කරන්න) ──
const initialItems = [
  { id: 1, name: 'Linen Sofa',          price: 899,  qty: 1, emoji: '🛋️', category: 'Living Room' },
  { id: 2, name: 'Oak Dining Table',    price: 1299, qty: 2, emoji: '🪑', category: 'Dining Room' },
  { id: 3, name: 'Velvet Armchair',     price: 549,  qty: 1, emoji: '🪑', category: 'Living Room' },
  { id: 4, name: 'Marble Coffee Table', price: 699,  qty: 1, emoji: '🪨', category: 'Living Room' },
  { id: 5, name: 'Pendant Light',       price: 299,  qty: 3, emoji: '💡', category: 'Lighting'    },
  { id: 6, name: 'Woven Rug',           price: 249,  qty: 1, emoji: '🟫', category: 'Decor'       },
]

const Cart = () => {
  const [items, setItems] = useState(initialItems)

  // Update quantity (min 1)
  const updateQty = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    )
  }

  // Remove item
  const removeItem = (id) =>
    setItems(prev => prev.filter(item => item.id !== id))

  const totalQty = items.reduce((s, i) => s + i.qty, 0)

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-8">

        {/* ── Page Header ── */}
        {items.length > 0 && (
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
          items={items}
          onUpdateQty={updateQty}
          onRemove={removeItem}
        />

      </div>
    </div>
  )
}

export default Cart;