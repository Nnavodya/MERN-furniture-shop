import React from 'react'
import { Link } from 'react-router-dom'
import { TbHeart, TbShoppingCart, TbStar, TbFlame } from 'react-icons/tb'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { products, categories } from '../data/products'

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

const Sale = () => {
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  // ── Products on sale — has an oldPrice in the shared data set ──
  const saleProducts = products.filter(p => p.oldPrice)

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id, name: product.name, price: product.price, emoji: product.emoji,
      category: categories.find(c => c.path === product.category)?.label || '',
    })
  }

  const handleToggleWishlist = (product) => {
    toggleWishlist({
      id: product.id, name: product.name, price: product.price,
      emoji: product.emoji, rating: product.rating, reviews: product.reviews,
    })
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>

      {/* ── Hero banner ── */}
      <div style={{ background: C.accent }}>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TbFlame className="h-6 w-6" style={{ color: '#FFD9A0' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#FFD9A0' }}>
              Limited Time
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            End of Season Sale
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Up to 30% off selected furniture — while stocks last.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <p className="text-sm mb-6" style={{ color: C.textMuted }}>
          {saleProducts.length} items on sale
        </p>

        {saleProducts.length === 0 ? (
          <div className="text-center py-20" style={{ color: C.textMuted }}>
            <p className="text-lg font-medium">No active sale items right now</p>
            <p className="text-sm mt-1">Check back soon, or browse all products.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-xl text-sm font-semibold"
              style={{ background: C.accent, color: '#FFFFFF' }}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {saleProducts.map(product => {
              const discountPct = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
              return (
                <div
                  key={product.id}
                  className="relative rounded-xl overflow-hidden transition-all duration-200"
                  style={{ background: C.card, border: `1px solid ${C.divider}` }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,26,14,0.10)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <Link to={`/products/${product.id}`}>
                    <div
                      className="relative w-full flex items-center justify-center text-4xl"
                      style={{ paddingBottom: '75%', background: C.accentLight }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-4xl" style={{ color: 'rgba(139,94,46,0.2)' }}>
                        {product.emoji}
                      </div>
                      <span
                        className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: '#E53935', color: '#FFFFFF' }}
                      >
                        -{discountPct}%
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={() => handleToggleWishlist(product)}
                    className="absolute p-1.5 rounded-full transition-all"
                    style={{
                      top: '8px', right: '8px', background: '#FFFFFF',
                      border: `1px solid ${C.accentBorder}`,
                      color: isWishlisted(product.id) ? '#E53935' : C.textMuted,
                    }}
                    aria-label="Toggle wishlist"
                  >
                    <TbHeart className="h-3.5 w-3.5" style={{ fill: isWishlisted(product.id) ? '#E53935' : 'none' }} />
                  </button>

                  <div className="p-3">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-sm font-semibold mb-1 leading-snug" style={{ color: C.text }}>
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1 mb-2">
                      <TbStar className="h-3 w-3" style={{ color: '#F59E0B' }} />
                      <span className="text-xs font-medium" style={{ color: C.text }}>{product.rating}</span>
                      <span className="text-xs" style={{ color: C.textMuted }}>({product.reviews})</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold" style={{ color: '#E53935' }}>
                        ${product.price.toLocaleString()}
                      </span>
                      <span className="text-xs line-through" style={{ color: C.textMuted }}>
                        ${product.oldPrice.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center gap-1 w-full py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{ background: C.accentLight, color: C.accent, border: `1px solid ${C.accentBorder}` }}
                      onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = '#FFFFFF' }}
                      onMouseLeave={e => { e.currentTarget.style.background = C.accentLight; e.currentTarget.style.color = C.accent }}
                    >
                      <TbShoppingCart className="h-3.5 w-3.5" /> Add
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sale;