// v2: New Arrivals Component (live API)
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TbArrowRight } from 'react-icons/tb'
import { colors } from './constants'
import api from '../../api/axios'

const NewArrivals = () => {
  const C = colors

  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true)
        setError('')
        const { data } = await api.get('/products')
        const sorted = [...data].sort((a, b) => {
          const aNew = a.badge === 'New' ? 1 : 0
          const bNew = b.badge === 'New' ? 1 : 0
          if (bNew !== aNew) return bNew - aNew
          return new Date(b.createdAt) - new Date(a.createdAt)
        })
        setItems(sorted.slice(0, 3))
      } catch (err) {
        setError('Failed to load new arrivals.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchNewArrivals()
  }, [])

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: C.text }}>
            Latest Furniture Collection 2026
          </h2>

          <p className="text-sm mt-2" style={{ color: C.textMuted }}>
            Discover our newest arrivals designed for modern living.
          </p>
        </div>

        <Link
          to="/products?filter=new"
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: C.accent }}
        >
          View All
          <TbArrowRight />
        </Link>
      </div>

      {loading && (
        <div className="text-center py-12" style={{ color: C.textMuted }}>
          <p className="text-sm">Loading new arrivals…</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-12" style={{ color: '#E53935' }}>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="text-center py-12" style={{ color: C.textMuted }}>
          <p className="text-sm">No new arrivals available right now.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {items.map((item) => (
            <Link
              key={item._id}
              to={`/products/${item._id}`}
              className="rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl block"
              style={{
                background: C.card,
                border: `1px solid ${C.divider}`,
              }}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div
                  className="w-full h-72 flex items-center justify-center text-5xl"
                  style={{ background: C.accentLight, color: 'rgba(139,94,46,0.25)' }}
                >
                  {item.emoji || '🪑'}
                </div>
              )}

              <div className="p-5">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: C.accentLight,
                    color: C.accent,
                  }}
                >
                  {item.badge || 'New'}
                </span>

                <h3 className="text-xl font-bold mt-3" style={{ color: C.text }}>
                  {item.name}
                </h3>

                <p className="text-sm mt-2" style={{ color: C.textMuted }}>
                  {item.description}
                </p>
              </div>
            </Link>
          ))}

        </div>
      )}
    </section>
  )
}

export default NewArrivals
