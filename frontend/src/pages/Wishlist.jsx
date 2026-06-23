import React from 'react'
import { Link } from 'react-router-dom'
import { TbHeart, TbTrash, TbShoppingCart, TbStar, TbArrowRight } from 'react-icons/tb'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

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

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlist.length === 0) {
    return (
      <div style={{ background: C.bg, minHeight: '100vh' }}>
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-5"
            style={{ background: C.accentLight }}
          >
            🤍
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: C.text }}>
            Your wishlist is empty
          </h1>
          <p className="text-sm mb-6" style={{ color: C.textMuted }}>
            Tap the heart icon on any product to save it here.
          </p>
          <Link
            to="/products"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: C.accent, color: '#FFFFFF' }}
          >
            Browse Products <TbArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-8">

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1" style={{ color: C.text }}>My Wishlist</h1>
          <p className="text-sm" style={{ color: C.textMuted }}>
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map(product => (
            <div
              key={product.id}
              className="relative rounded-xl overflow-hidden transition-all duration-200"
              style={{ background: C.card, border: `1px solid ${C.divider}` }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,26,14,0.10)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <Link to={`/products/${product.id}`}>
                <div
                  className="relative w-full flex items-center justify-center"
                  style={{ paddingBottom: '75%', background: C.accentLight }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center text-4xl"
                    style={{ color: 'rgba(139,94,46,0.2)' }}
                  >
                    {product.emoji}
                  </div>
                </div>
              </Link>

              {/* Remove from wishlist */}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute p-1.5 rounded-full transition-all"
                style={{
                  top: '8px', right: '8px',
                  background: '#FFFFFF',
                  border: `1px solid ${C.accentBorder}`,
                  color: '#E53935',
                }}
                aria-label="Remove from wishlist"
              >
                <TbTrash className="h-3.5 w-3.5" />
              </button>

              <div className="p-3">
                <Link to={`/products/${product.id}`}>
                  <h3
                    className="text-sm font-semibold mb-1 leading-snug transition-colors"
                    style={{ color: C.text }}
                    onMouseEnter={e => e.currentTarget.style.color = C.accent}
                    onMouseLeave={e => e.currentTarget.style.color = C.text}
                  >
                    {product.name}
                  </h3>
                </Link>

                {product.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <TbStar className="h-3 w-3" style={{ color: '#F59E0B' }} />
                    <span className="text-xs font-medium" style={{ color: C.text }}>{product.rating}</span>
                    {product.reviews && (
                      <span className="text-xs" style={{ color: C.textMuted }}>({product.reviews})</span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: C.accent }}>
                    ${product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => addToCart({
                      id: product.id, name: product.name, price: product.price, emoji: product.emoji,
                    })}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all"
                    style={{ background: C.accentLight, color: C.accent, border: `1px solid ${C.accentBorder}` }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = '#FFFFFF' }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.accentLight; e.currentTarget.style.color = C.accent }}
                  >
                    <TbShoppingCart className="h-3.5 w-3.5" /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist;