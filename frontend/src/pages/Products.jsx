import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { TbSearch, TbHeart, TbShoppingCart, TbStar } from 'react-icons/tb'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { products, categories, sortOptions } from '../data/products'

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

const Products = () => {
  const [searchParams] = useSearchParams()
  const activeCat = searchParams.get('category') || ''
  const [sort, setSort]     = useState('featured')
  const [search, setSearch] = useState('')

  // ── Real cart & wishlist — shared across Header badge, CartDrawer, Wishlist page ──
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const filtered = products
    .filter(p =>
      (activeCat === '' || p.category === activeCat) &&
      (search === '' || p.name.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === 'price-asc')  return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'newest')     return b.id - a.id
      return 0 // featured = original order
    })

  const handleAddToCart = (product) => {
    addToCart({
      id:    product.id,
      name:  product.name,
      price: product.price,
      emoji: product.emoji,
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
      <div className="container mx-auto px-4 py-8">

        {/* ── Page Header ── */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1" style={{ color: C.text }}>
            {activeCat ? categories.find(c => c.path === activeCat)?.label : 'All Products'}
          </h1>
          <p className="text-sm" style={{ color: C.textMuted }}>
            {filtered.length} products found
          </p>
        </div>

        {/* ── Filters Row ── */}
        <div className="flex flex-wrap items-center gap-3 mb-6">

          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 min-w-[200px]"
            style={{ background: C.card, border: `1px solid ${C.accentBorder}` }}
          >
            <TbSearch className="h-4 w-4 shrink-0" style={{ color: C.accent }} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full"
              style={{ color: C.text }}
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-3 py-2 rounded-lg text-sm outline-none cursor-pointer"
            style={{
              background: C.card,
              border: `1px solid ${C.accentBorder}`,
              color: C.text,
            }}
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* ── Category Pills ── */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(cat => {
            const active = activeCat === cat.path
            return (
              <Link
                key={cat.path}
                to={cat.path ? `/products?category=${cat.path}` : '/products'}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150"
                style={{
                  background:  active ? C.accent       : C.card,
                  color:       active ? '#FFFFFF'      : C.textMuted,
                  border:      `1px solid ${active ? C.accent : C.accentBorder}`,
                }}
              >
                {cat.label}
              </Link>
            )
          })}
        </div>

        {/* ── Product Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: C.textMuted }}>
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(product => (
              <div
                key={product.id}
                className="relative rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  background: C.card,
                  border: `1px solid ${C.divider}`,
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,26,14,0.10)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                {/* Image placeholder */}
                <Link to={`/products/${product.id}`}>
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: '75%', background: C.accentLight }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center text-4xl"
                      style={{ color: 'rgba(139,94,46,0.2)' }}
                    >
                      {product.emoji}
                    </div>

                    {/* Badge */}
                    {product.badge && (
                      <span
                        className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: product.badge === 'Sale' ? '#E53935' : C.accent,
                          color: '#FFFFFF',
                        }}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Wishlist */}
                <button
                  onClick={() => handleToggleWishlist(product)}
                  className="absolute p-1.5 rounded-full transition-all"
                  style={{
                    top: '8px', right: '8px',
                    background: '#FFFFFF',
                    border: `1px solid ${C.accentBorder}`,
                    color: isWishlisted(product.id) ? '#E53935' : C.textMuted,
                  }}
                  aria-label="Toggle wishlist"
                >
                  <TbHeart className="h-3.5 w-3.5" style={{ fill: isWishlisted(product.id) ? '#E53935' : 'none' }} />
                </button>

                {/* Info */}
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

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <TbStar className="h-3 w-3" style={{ color: '#F59E0B' }} />
                    <span className="text-xs font-medium" style={{ color: C.text }}>
                      {product.rating}
                    </span>
                    <span className="text-xs" style={{ color: C.textMuted }}>
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price + Cart */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold" style={{ color: C.accent }}>
                      ${product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: C.accentLight,
                        color: C.accent,
                        border: `1px solid ${C.accentBorder}`,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = C.accent
                        e.currentTarget.style.color = '#FFFFFF'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = C.accentLight
                        e.currentTarget.style.color = C.accent
                      }}
                    >
                      <TbShoppingCart className="h-3.5 w-3.5" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products;
