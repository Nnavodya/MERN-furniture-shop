import React from 'react'
import { Link } from 'react-router-dom'
import { TbX, TbPlus, TbMinus, TbTrash, TbShoppingCart, TbArrowRight } from 'react-icons/tb'

const C = {
  bg:           '#FFFFFF',
  overlay:      'rgba(44,26,14,0.35)',
  accent:       '#8B5E2E',
  accentLight:  'rgba(139,94,46,0.08)',
  accentBorder: 'rgba(139,94,46,0.18)',
  text:         '#2C1A0E',
  textMuted:    'rgba(44,26,14,0.55)',
  divider:      'rgba(139,94,46,0.12)',
}

const CartDrawer = ({ isOpen, onClose, items = [], onUpdateQty, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal >= 100 ? 0 : 25
  const total    = subtotal + shipping

  return (
    <>
      {/* ── Overlay ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50"
          style={{ background: C.overlay, backdropFilter: 'blur(2px)' }}
          onClick={onClose}
        />
      )}

      {/* ── Drawer Panel ── */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col"
        style={{
          width: '380px',
          maxWidth: '100vw',
          background: C.bg,
          boxShadow: '-8px 0 32px rgba(44,26,14,0.12)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: `1px solid ${C.divider}` }}
        >
          <div className="flex items-center gap-2">
            <TbShoppingCart className="h-5 w-5" style={{ color: C.accent }} />
            <h2 className="text-base font-bold" style={{ color: C.text }}>
              Your Cart
            </h2>
            {items.length > 0 && (
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: C.accentLight, color: C.accent }}
              >
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all"
            style={{ color: C.textMuted, border: `1px solid ${C.divider}` }}
            onMouseEnter={e => {
              e.currentTarget.style.background = C.accentLight
              e.currentTarget.style.color = C.accent
              e.currentTarget.style.borderColor = C.accentBorder
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = C.textMuted
              e.currentTarget.style.borderColor = C.divider
            }}
          >
            <TbX className="h-4 w-4" />
          </button>
        </div>

        {/* ── Body ── */}
        {items.length === 0 ? (

          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ background: C.accentLight }}
            >
              🛒
            </div>
            <p className="font-semibold" style={{ color: C.text }}>Your cart is empty</p>
            <p className="text-sm" style={{ color: C.textMuted }}>
              Add some furniture to get started!
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: C.accent, color: '#FFFFFF' }}
              onMouseEnter={e => e.currentTarget.style.background = '#7A5229'}
              onMouseLeave={e => e.currentTarget.style.background = C.accent}
            >
              Continue Shopping
            </button>
          </div>

        ) : (

          /* Cart items list */
          <div className="flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-3">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ border: `1px solid ${C.divider}` }}
              >
                {/* Image */}
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl shrink-0"
                  style={{ background: C.accentLight }}
                >
                  {item.emoji || '🪑'}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-snug truncate" style={{ color: C.text }}>
                    {item.name}
                  </p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: C.accent }}>
                    ${item.price.toLocaleString()}
                  </p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-lg"
                      style={{ border: `1px solid ${C.accentBorder}` }}
                    >
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="p-0.5 rounded transition-colors"
                        style={{ color: C.accent }}
                        onMouseEnter={e => e.currentTarget.style.background = C.accentLight}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <TbMinus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center" style={{ color: C.text }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, +1)}
                        className="p-0.5 rounded transition-colors"
                        style={{ color: C.accent }}
                        onMouseEnter={e => e.currentTarget.style.background = C.accentLight}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <TbPlus className="h-3 w-3" />
                      </button>
                    </div>

                    <span className="text-xs font-semibold" style={{ color: C.textMuted }}>
                      = ${(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-1.5 rounded-lg transition-all shrink-0"
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
                  <TbTrash className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Footer / Summary ── */}
        {items.length > 0 && (
          <div
            className="px-5 py-4 shrink-0 flex flex-col gap-3"
            style={{ borderTop: `1px solid ${C.divider}` }}
          >
            {/* Price rows */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-sm" style={{ color: C.textMuted }}>
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: C.textMuted }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? '🎉 Free' : `$${shipping}`}</span>
              </div>
              <div
                className="flex justify-between text-base font-bold pt-2"
                style={{ color: C.text, borderTop: `1px solid ${C.divider}` }}
              >
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-center" style={{ color: C.textMuted }}>
                Add ${(100 - subtotal)} more for free shipping
              </p>
            )}

            {/* Buttons */}
            <Link
              to="/checkout"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: C.accent, color: '#FFFFFF' }}
              onMouseEnter={e => e.currentTarget.style.background = '#7A5229'}
              onMouseLeave={e => e.currentTarget.style.background = C.accent}
            >
              Checkout <TbArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: 'transparent',
                color: C.accent,
                border: `1px solid ${C.accentBorder}`,
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.accentLight}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer;
