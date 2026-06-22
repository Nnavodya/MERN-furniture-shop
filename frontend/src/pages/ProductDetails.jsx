import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  TbStar, TbHeart, TbMinus, TbPlus, TbShoppingCart,
  TbTruck, TbShieldCheck, TbRefresh, TbChevronRight,
} from 'react-icons/tb'
import { useCart } from '../context/CartContext'
import { getProductById, getRelatedProducts, categories } from '../data/products'

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

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = getProductById(id)

  const [qty, setQty]               = useState(1)
  const [selectedColor, setColor]   = useState(0)
  const [wishlisted, setWishlisted] = useState(false)
  const [justAdded, setJustAdded]   = useState(false)
  const [tab, setTab]               = useState('description')

  // ── Product not found ──
  if (!product) {
    return (
      <div style={{ background: C.bg, minHeight: '100vh' }}>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-2xl font-bold mb-2" style={{ color: C.text }}>
            Product not found
          </p>
          <p className="text-sm mb-6" style={{ color: C.textMuted }}>
            The product you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: C.accent, color: '#FFFFFF' }}
          >
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const related   = getRelatedProducts(product)
  const categoryLabel = categories.find(c => c.path === product.category)?.label || ''

  const handleAddToCart = () => {
    addToCart({
      id:    product.id,
      name:  product.name,
      price: product.price,
      emoji: product.emoji,
      category: categoryLabel,
    }, qty)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-8">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-1.5 text-xs mb-6" style={{ color: C.textMuted }}>
          <Link to="/" className="hover:underline">Home</Link>
          <TbChevronRight className="h-3 w-3" />
          <Link to="/products" className="hover:underline">Products</Link>
          <TbChevronRight className="h-3 w-3" />
          <Link to={`/products?category=${product.category}`} className="hover:underline">
            {categoryLabel}
          </Link>
          <TbChevronRight className="h-3 w-3" />
          <span style={{ color: C.text }}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

          {/* ── LEFT: Image gallery ── */}
          <div>
            <div
              className="relative rounded-2xl flex items-center justify-center"
              style={{ background: C.accentLight, aspectRatio: '1/1' }}
            >
              <span style={{ fontSize: '7rem', color: 'rgba(139,94,46,0.25)' }}>
                {product.emoji}
              </span>

              {product.badge && (
                <span
                  className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: product.badge === 'Sale' ? '#E53935' : C.accent,
                    color: '#FFFFFF',
                  }}
                >
                  {product.badge}
                </span>
              )}

              {!product.inStock && (
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(44,26,14,0.45)' }}
                >
                  <span className="text-sm font-bold px-4 py-2 rounded-full" style={{ background: '#FFFFFF', color: C.text }}>
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail row — placeholder variations of same emoji */}
            <div className="flex gap-3 mt-4">
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className="flex items-center justify-center rounded-xl text-2xl cursor-pointer transition-all"
                  style={{
                    width: '70px', height: '70px',
                    background: C.accentLight,
                    border: `1.5px solid ${i === 0 ? C.accent : C.divider}`,
                  }}
                >
                  {product.emoji}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Info panel ── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: C.accent }}>
              {categoryLabel}
            </p>

            <h1 className="text-3xl font-bold mb-3" style={{ color: C.text }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <TbStar
                    key={i}
                    className="h-4 w-4"
                    style={{
                      color: i <= Math.round(product.rating) ? '#F59E0B' : C.divider,
                      fill:  i <= Math.round(product.rating) ? '#F59E0B' : 'transparent',
                    }}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold" style={{ color: C.text }}>{product.rating}</span>
              <span className="text-sm" style={{ color: C.textMuted }}>({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold" style={{ color: C.accent }}>
                ${product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-lg line-through" style={{ color: C.textMuted }}>
                  ${product.oldPrice.toLocaleString()}
                </span>
              )}
              {product.oldPrice && (
                <span
                  className="text-xs font-bold px-2 py-1 rounded-full"
                  style={{ background: 'rgba(229,57,53,0.1)', color: '#E53935' }}
                >
                  Save ${(product.oldPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: C.textMuted }}>
              {product.description}
            </p>

            {/* Color swatches */}
            {product.colors?.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-semibold mb-2" style={{ color: C.text }}>
                  Color
                </p>
                <div className="flex gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c}
                      onClick={() => setColor(i)}
                      className="rounded-full transition-all"
                      style={{
                        width: '32px', height: '32px',
                        background: c,
                        border: selectedColor === i ? `2.5px solid ${C.accent}` : `2px solid ${C.divider}`,
                        outline: selectedColor === i ? `2px solid ${C.accentLight}` : 'none',
                      }}
                      aria-label={`Color option ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                style={{ border: `1px solid ${C.accentBorder}` }}
              >
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ color: C.accent }}
                >
                  <TbMinus className="h-4 w-4" />
                </button>
                <span className="text-sm font-bold w-6 text-center" style={{ color: C.text }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  style={{ color: C.accent }}
                >
                  <TbPlus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: product.inStock ? C.accent : C.divider,
                  color: '#FFFFFF',
                  cursor: product.inStock ? 'pointer' : 'not-allowed',
                  opacity: product.inStock ? 1 : 0.6,
                }}
                onMouseEnter={e => { if (product.inStock) e.currentTarget.style.background = '#7A5229' }}
                onMouseLeave={e => { if (product.inStock) e.currentTarget.style.background = C.accent }}
              >
                <TbShoppingCart className="h-4 w-4" />
                {justAdded ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>

              <button
                onClick={() => setWishlisted(w => !w)}
                className="p-3 rounded-xl transition-all shrink-0"
                style={{
                  border: `1px solid ${C.accentBorder}`,
                  color: wishlisted ? '#E53935' : C.textMuted,
                  background: wishlisted ? 'rgba(229,57,53,0.06)' : 'transparent',
                }}
              >
                <TbHeart className="h-5 w-5" style={{ fill: wishlisted ? '#E53935' : 'none' }} />
              </button>
            </div>

            {product.inStock && (
              <button
                onClick={handleBuyNow}
                className="w-full py-3 rounded-xl text-sm font-semibold mb-6 transition-all"
                style={{ background: '#FFFFFF', color: C.accent, border: `1.5px solid ${C.accent}` }}
                onMouseEnter={e => e.currentTarget.style.background = C.accentLight}
                onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
              >
                Buy Now
              </button>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-5" style={{ borderTop: `1px solid ${C.divider}` }}>
              {[
                { icon: TbTruck,       label: 'Free Delivery'  },
                { icon: TbShieldCheck, label: '2 Yr Warranty'  },
                { icon: TbRefresh,     label: '30-Day Returns' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon className="h-5 w-5" style={{ color: C.accent }} />
                  <span className="text-[11px]" style={{ color: C.textMuted }}>{label}</span>
                </div>
              ))}
            </div>

            <p className="text-xs mt-5" style={{ color: C.textMuted }}>
              SKU: {product.sku}
            </p>
          </div>
        </div>

        {/* ── Tabs: Description / Reviews ── */}
        <div className="mb-12">
          <div className="flex gap-6 mb-5" style={{ borderBottom: `1px solid ${C.divider}` }}>
            {[
              { key: 'description', label: 'Description' },
              { key: 'reviews',      label: `Reviews (${product.reviews})` },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="pb-3 text-sm font-semibold transition-colors"
                style={{
                  color: tab === t.key ? C.accent : C.textMuted,
                  borderBottom: tab === t.key ? `2px solid ${C.accent}` : '2px solid transparent',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'description' ? (
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: C.textMuted }}>
              {product.description} Crafted with attention to detail, this piece is designed
              to be both a functional addition and a visual anchor in your space. Each unit is
              quality-checked before shipping, and arrives with simple assembly instructions
              where needed.
            </p>
          ) : (
            <div className="flex flex-col gap-4 max-w-2xl">
              {[
                { name: 'Priya K.', rating: 5, text: 'Exactly as described — sturdy, well-finished, and arrived faster than expected.' },
                { name: 'Daniel R.', rating: 4, text: 'Great quality for the price. Assembly took about 20 minutes.' },
              ].map((r, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: C.card, border: `1px solid ${C.divider}` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(s => (
                        <TbStar
                          key={s}
                          className="h-3.5 w-3.5"
                          style={{ color: s <= r.rating ? '#F59E0B' : C.divider, fill: s <= r.rating ? '#F59E0B' : 'transparent' }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: C.text }}>{r.name}</span>
                  </div>
                  <p className="text-sm" style={{ color: C.textMuted }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ color: C.text }}>
              You may also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(p => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="rounded-xl overflow-hidden transition-all"
                  style={{ background: C.card, border: `1px solid ${C.divider}` }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,26,14,0.10)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div
                    className="flex items-center justify-center text-3xl"
                    style={{ aspectRatio: '4/3', background: C.accentLight }}
                  >
                    {p.emoji}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold mb-1" style={{ color: C.text }}>{p.name}</p>
                    <p className="text-sm font-bold" style={{ color: C.accent }}>
                      ${p.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProductDetails;
