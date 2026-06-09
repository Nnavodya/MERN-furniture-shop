import React from 'react'
import { Link } from 'react-router-dom'
import { TbX, TbPlus, TbMinus, TbTrash, TbShoppingCart, TbArrowRight, TbTag } from 'react-icons/tb'

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
  const totalQty = items.reduce((s, i) => s + i.qty, 0)

  // Free shipping progress %
  const freeShippingProgress = Math.min((subtotal / 100) * 100, 100)

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
          width:      '400px',
          maxWidth:   '100vw',
          background: C.bg,
          boxShadow:  '-8px 0 32px rgba(44,26,14,0.14)',
          transform:  isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >

        {/* ───────────────────────────────────────
            TOP: Header  (shrink-0 — never scrolls)
        ─────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: `1px solid ${C.divider}` }}
        >
          <div className="flex items-center gap-2">
            <TbShoppingCart className="h-5 w-5" style={{ color: C.accent }} />
            <h2 className="text-base font-bold" style={{ color: C.text }}>
              Your Cart
            </h2>
            {totalQty > 0 && (
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: C.accentLight, color: C.accent }}
              >
                {totalQty} {totalQty === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all"
            style={{ color: C.textMuted, border: `1px solid ${C.divider}` }}
            onMouseEnter={e => {
              e.currentTarget.style.background   = C.accentLight
              e.currentTarget.style.color        = C.accent
              e.currentTarget.style.borderColor  = C.accentBorder
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background   = 'transparent'
              e.currentTarget.style.color        = C.textMuted
              e.currentTarget.style.borderColor  = C.divider
            }}
          >
            <TbX className="h-4 w-4" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        {items.length > 0 && (
          <div
            className="px-5 py-3 shrink-0"
            style={{ borderBottom: `1px solid ${C.divider}`, background: C.accentLight }}
          >
            {shipping === 0 ? (
              <p className="text-xs font-medium text-center" style={{ color: '#2E7D32' }}>
                🎉 You've unlocked free shipping!
              </p>
            ) : (
              <>
                <p className="text-xs mb-1.5" style={{ color: C.textMuted }}>
                  Add <span style={{ color: C.accent, fontWeight: 700 }}>${100 - subtotal}</span> more for free shipping
                </p>
                <div
                  className="w-full rounded-full overflow-hidden"
                  style={{ height: '5px', background: 'rgba(139,94,46,0.15)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%`, background: C.accent }}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* ───────────────────────────────────────
            MIDDLE: Scrollable cart items area
        ─────────────────────────────────────── */}
        {items.length === 0 ? (

          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
              style={{ background: C.accentLight }}
            >
              🛒
            </div>
            <div>
              <p className="font-semibold text-lg" style={{ color: C.text }}>
                Your cart is empty
              </p>
              <p className="text-sm mt-1" style={{ color: C.textMuted }}>
                Add some furniture to get started!
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: C.accent, color: '#FFFFFF' }}
              onMouseEnter={e => e.currentTarget.style.background = '#7A5229'}
              onMouseLeave={e => e.currentTarget.style.background = C.accent}
            >
              Continue Shopping <TbArrowRight className="h-4 w-4" />
            </button>
          </div>

        ) : (

          /* ── Scrollable items list ── */
          <div
            className="flex-1 overflow-y-auto px-5 py-4"
            style={{ scrollbarWidth: 'thin', scrollbarColor: `rgba(139,94,46,0.3) transparent` }}
          >
            <div className="flex flex-col gap-3">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-xl transition-all"
                  style={{ border: `1px solid ${C.divider}` }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.accentBorder}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.divider}
                >
                  {/* Product image */}
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl shrink-0"
                    style={{ background: C.accentLight }}
                  >
                    {item.emoji || '🪑'}
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold leading-snug"
                      style={{
                        color: C.text,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.name}
                    </p>

                    <p className="text-sm font-bold mt-1" style={{ color: C.accent }}>
                      ${item.price.toLocaleString()}
                    </p>

                    {/* Qty + line total row */}
                    <div className="flex items-center justify-between mt-2">
                      {/* Qty controls */}
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
                        <span
                          className="text-xs font-bold w-5 text-center"
                          style={{ color: C.text }}
                        >
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

                      {/* Line total */}
                      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>
                        ${(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1.5 rounded-lg transition-all shrink-0"
                    style={{ color: C.textMuted, border: `1px solid ${C.divider}` }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color        = '#E53935'
                      e.currentTarget.style.borderColor  = '#E53935'
                      e.currentTarget.style.background   = 'rgba(229,57,53,0.06)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color        = C.textMuted
                      e.currentTarget.style.borderColor  = C.divider
                      e.currentTarget.style.background   = 'transparent'
                    }}
                  >
                    <TbTrash className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────
            BOTTOM: Summary + Checkout  (shrink-0 — always visible)
        ─────────────────────────────────────── */}
        {items.length > 0 && (
          <div
            className="px-5 py-4 shrink-0 flex flex-col gap-3"
            style={{
              borderTop:  `1px solid ${C.divider}`,
              background: '#FDFAF7',
              boxShadow:  '0 -4px 16px rgba(44,26,14,0.06)',
            }}
          >
            {/* Price breakdown */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-sm" style={{ color: C.textMuted }}>
                <span>Subtotal ({totalQty} items)</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: C.textMuted }}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? '#2E7D32' : C.textMuted }}>
                  {shipping === 0 ? 'Free 🎉' : `$${shipping}`}
                </span>
              </div>
              <div
                className="flex justify-between text-base font-bold pt-2"
                style={{ color: C.text, borderTop: `1px solid ${C.divider}` }}
              >
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout button — always at bottom */}
            <Link
              to="/checkout"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: C.accent, color: '#FFFFFF' }}
              onMouseEnter={e => e.currentTarget.style.background = '#7A5229'}
              onMouseLeave={e => e.currentTarget.style.background = C.accent}
            >
              Proceed to Checkout <TbArrowRight className="h-4 w-4" />
            </Link>

            {/* View full cart link */}
            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: 'transparent',
                color:      C.accent,
                border:     `1px solid ${C.accentBorder}`,
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