// v2: Best Selling Products Component (live API)
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TbArrowRight, TbStar } from 'react-icons/tb'
import { colors } from './constants'
import { useCart } from '../../context/CartContext'
import api from '../../api/axios'

const BestSellingProducts = () => {
  const C = colors
  const { addToCart } = useCart()

  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true)
        setError('')
        const { data } = await api.get('/products')
        const ranked = [...data].sort((a, b) => {
          const aBest = a.badge === 'Bestseller' || a.badge === 'Best Seller' ? 1 : 0
          const bBest = b.badge === 'Bestseller' || b.badge === 'Best Seller' ? 1 : 0
          if (bBest !== aBest) return bBest - aBest
          return (b.reviews || 0) - (a.reviews || 0)
        })
        setProducts(ranked.slice(0, 4))
      } catch (err) {
        setError('Failed to load best selling products.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBestSellers()
  }, [])

  const handleAddToCart = (product) => {
    if (product.inStock === false) return
    addToCart({
      id:       product._id,
      name:     product.name,
      price:    product.price,
      emoji:    product.emoji,
      imageUrl: product.imageUrl,
      category: product.category,
    })
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: C.text }}>
            Best Selling Products
          </h2>
          <p className="text-sm mt-2" style={{ color: C.textMuted }}>
            Most loved furniture pieces by our customers
          </p>
        </div>

        <Link
          to="/products"
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: C.accent }}
        >
          View All
          <TbArrowRight />
        </Link>
      </div>

      {loading && (
        <div className="text-center py-12" style={{ color: C.textMuted }}>
          <p className="text-sm">Loading best sellers…</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-12" style={{ color: '#E53935' }}>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-12" style={{ color: C.textMuted }}>
          <p className="text-sm">No products available right now.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => {
            const outOfStock = product.inStock === false
            return (
              <div
                key={product._id}
                className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#8B5E2E]"
                style={{
                  background: C.card,
                  border: `1px solid ${C.divider}`,
                }}
              >
                {/* Image */}
                <Link to={`/products/${product._id}`} className="block overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div
                      className="w-full h-60 flex items-center justify-center text-5xl"
                      style={{ background: C.accentLight, color: 'rgba(139,94,46,0.25)' }}
                    >
                      {product.emoji || '🪑'}
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-4">

                  {/* Name */}
                  <Link to={`/products/${product._id}`}>
                    <h3 className="font-semibold text-lg" style={{ color: C.text }}>
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price */}
                  <p className="font-bold text-xl mt-2" style={{ color: C.accent }}>
                    ${product.price.toLocaleString()}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2 transition-all duration-300 hover:scale-110">
                    <TbStar className="text-yellow-500" />
                    <span>{product.rating}</span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-4">

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      disabled={outOfStock}
                      className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105"
                      style={{
                        background: outOfStock ? C.divider : C.accent,
                        color: outOfStock ? C.textMuted : '#fff',
                        cursor: outOfStock ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>

                    <Link
                      to={`/products/${product._id}`}
                      className="flex-1 py-2 rounded-lg text-sm font-semibold text-center"
                      style={{
                        border: `1px solid ${C.accent}`,
                        color: C.accent,
                      }}
                    >
                      Quick View
                    </Link>

                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default BestSellingProducts
