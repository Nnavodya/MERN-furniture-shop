import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { TbUpload, TbSearch, TbArrowRight, TbStar, TbShoppingCart, TbX } from 'react-icons/tb'
import { useCart } from '../context/CartContext'
import api from '../api/axios'

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

const RoomAnalyzer = () => {
  const [image, setImage]         = useState(null)
  const [preview, setPreview]     = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult]       = useState(null)
  const [products, setProducts]   = useState([])
  const [error, setError]         = useState('')
  const fileRef = useRef()
  const { addToCart } = useCart()

  const handleFile = (file) => {
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult(null)
    setProducts([])
    setError('')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0])
  }

  const handleAnalyze = async () => {
    if (!image) return
    setAnalyzing(true)
    setError('')
    setResult(null)
    setProducts([])

    try {
      // ── Step 1: Analyze room with Gemini ──
      const formData = new FormData()
      formData.append('image', image)
      const { data: analysis } = await api.post('/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(analysis)

      // ── Step 2: Fetch matching products ──
      if (analysis.suggestedCategories?.length > 0) {
        const category = analysis.suggestedCategories[0]
        const { data: prods } = await api.get('/products', { params: { category } })
        setProducts(prods.slice(0, 4))
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleAddToCart = (product) => {
    addToCart({
      id:    product._id,
      name:  product.name,
      price: product.price,
      emoji: product.emoji,
    })
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <span
            className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ background: C.accentLight, color: C.accent }}
          >
            AI Powered
          </span>
          <h1 className="text-3xl font-bold mt-3 mb-2" style={{ color: C.text }}>
            Room Furniture Analyzer
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: C.textMuted }}>
            Upload a photo of your room and our AI will suggest the perfect furniture to match your style.
          </p>
        </div>

        {/* ── Upload Area ── */}
        <div
          className="rounded-2xl p-8 mb-6 text-center cursor-pointer transition-all"
          style={{
            border: `2px dashed ${preview ? C.accent : C.accentBorder}`,
            background: preview ? 'transparent' : C.accentLight,
          }}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => !preview && fileRef.current.click()}
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Room preview"
                className="w-full max-h-80 object-cover rounded-xl"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setImage(null)
                  setPreview(null)
                  setResult(null)
                  setProducts([])
                }}
                className="absolute top-3 right-3 p-1.5 rounded-full"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#FFF' }}
              >
                <TbX className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(139,94,46,0.15)' }}
              >
                <TbUpload className="h-7 w-7" style={{ color: C.accent }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: C.text }}>
                  Drop your room photo here
                </p>
                <p className="text-xs mt-1" style={{ color: C.textMuted }}>
                  or click to browse — JPG, PNG, WEBP
                </p>
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => handleFile(e.target.files[0])}
        />

        {/* ── Analyze Button ── */}
        {preview && (
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold mb-6 transition-all"
            style={{
              background: analyzing ? C.accentBorder : C.accent,
              color: '#FFFFFF',
              cursor: analyzing ? 'not-allowed' : 'pointer',
            }}
          >
            {analyzing ? (
              <>
                <div
                  className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"
                />
                Analyzing your room…
              </>
            ) : (
              <>
                <TbSearch className="h-4 w-4" /> Analyze Room & Find Furniture
              </>
            )}
          </button>
        )}

        {/* ── Error ── */}
        {error && (
          <div
            className="px-4 py-3 rounded-xl text-sm mb-6"
            style={{ background: 'rgba(229,57,53,0.08)', color: '#C62828' }}
          >
            {error}
          </div>
        )}

        {/* ── Analysis Result ── */}
        {result && (
          <div
            className="rounded-2xl p-6 mb-8"
            style={{ background: C.card, border: `1px solid ${C.divider}` }}
          >
            <h2 className="text-base font-bold mb-4" style={{ color: C.text }}>
              AI Analysis Result
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {[
                { label: 'Room Type',  value: result.roomType  },
                { label: 'Style',      value: result.style     },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="p-3 rounded-xl"
                  style={{ background: C.accentLight }}
                >
                  <p className="text-[10px] font-semibold uppercase mb-1" style={{ color: C.accent }}>
                    {label}
                  </p>
                  <p className="text-xs font-semibold capitalize" style={{ color: C.text }}>
                    {value}
                  </p>
                </div>
              ))}

              {/* Color palette */}
              {result.colors?.length > 0 && (
                <div className="p-3 rounded-xl" style={{ background: C.accentLight }}>
                  <p className="text-[10px] font-semibold uppercase mb-2" style={{ color: C.accent }}>
                    Room Colors
                  </p>
                  <div className="flex gap-1.5">
                    {result.colors.slice(0, 4).map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border"
                        style={{ background: color, borderColor: C.divider }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested categories */}
              {result.suggestedCategories?.length > 0 && (
                <div className="p-3 rounded-xl" style={{ background: C.accentLight }}>
                  <p className="text-[10px] font-semibold uppercase mb-2" style={{ color: C.accent }}>
                    Best For
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {result.suggestedCategories.map(cat => (
                      <span
                        key={cat}
                        className="text-[10px] px-1.5 py-0.5 rounded-full capitalize"
                        style={{ background: 'rgba(139,94,46,0.15)', color: C.accent }}
                      >
                        {cat.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {result.description && (
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                {result.description}
              </p>
            )}
          </div>
        )}

        {/* ── Suggested Products ── */}
        {products.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold" style={{ color: C.text }}>
                Recommended for Your Room
              </h2>
              {result?.suggestedCategories?.[0] && (
                <Link
                  to={`/products?category=${result.suggestedCategories[0]}`}
                  className="flex items-center gap-1 text-sm font-medium"
                  style={{ color: C.accent }}
                >
                  View all <TbArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {products.map(product => (
                <div
                  key={product._id}
                  className="rounded-xl overflow-hidden transition-all duration-200"
                  style={{ background: C.card, border: `1px solid ${C.divider}` }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,26,14,0.10)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <Link to={`/products/${product._id}`}>
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: '75%', background: C.accentLight }}
                    >
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-3xl">
                          {product.emoji}
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-3">
                    <Link to={`/products/${product._id}`}>
                      <p className="text-xs font-semibold mb-1" style={{ color: C.text }}>
                        {product.name}
                      </p>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      <TbStar className="h-3 w-3" style={{ color: '#F59E0B' }} />
                      <span className="text-xs" style={{ color: C.textMuted }}>{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold" style={{ color: C.accent }}>
                        ${product.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium"
                        style={{ background: C.accentLight, color: C.accent, border: `1px solid ${C.accentBorder}` }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = '#FFF' }}
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
        )}
      </div>
    </div>
  )
}

export default RoomAnalyzer;