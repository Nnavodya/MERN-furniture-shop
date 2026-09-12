import React, { useState, useEffect } from 'react'
import { TbPlus, TbEdit, TbTrash, TbSearch, TbX, TbCheck } from 'react-icons/tb'
import api from '../../api/axios'

const C = {
  bg:       '#1C0F05',
  card:     '#231208',
  accent:   '#D4A373',
  accentDark: '#8B5E2E',
  text:     '#F5EDE0',
  textMuted:'rgba(245,237,224,0.5)',
  divider:  'rgba(212,163,115,0.15)',
  border:   'rgba(212,163,115,0.12)',
  input:    '#2C1A0E',
}

const EMPTY_FORM = {
  name: '', category: 'living-room', price: '', oldPrice: '',
  badge: '', emoji: '🪑', description: '', inStock: true, sku: '',
}

const categories = [
  'living-room','bedroom','dining','office','outdoor','storage','lighting','decor',
]

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null) // product being edited
  const [form, setForm]         = useState(EMPTY_FORM)
  const [saving, setSaving]     = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [error, setError]       = useState('')

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/products')
      setProducts(data)
    } catch (err) {
      setError('Failed to load products.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (product) => {
    setEditing(product)
    setForm({
      name:        product.name        || '',
      category:    product.category    || 'living-room',
      price:       product.price       || '',
      oldPrice:    product.oldPrice    || '',
      badge:       product.badge       || '',
      emoji:       product.emoji       || '🪑',
      description: product.description || '',
      inStock:     product.inStock !== false,
      sku:         product.sku         || '',
    })
    setShowForm(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = {
        ...form,
        price:    Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      }
      if (editing) {
        await api.put(`/products/${editing._id}`, payload)
      } else {
        await api.post('/products', payload)
      }
      setShowForm(false)
      fetchProducts()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`)
      setDeleteId(null)
      fetchProducts()
    } catch (err) {
      setError('Failed to delete product.')
    }
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold" style={{ color: C.textMuted }}>{label}</label>
      {children}
    </div>
  )

  const inputStyle = {
    background: C.input, border: `1px solid ${C.border}`,
    color: C.text, borderRadius: '8px', padding: '8px 12px', fontSize: '13px', outline: 'none',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: C.text }}>Products</h1>
          <p className="text-sm mt-1" style={{ color: C.textMuted }}>{products.length} total products</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
          style={{ background: C.accent, color: '#1C0F05' }}
        >
          <TbPlus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-2.5 rounded-lg text-sm" style={{ background: 'rgba(244,67,54,0.1)', color: '#EF9A9A' }}>
          {error}
        </div>
      )}

      {/* Search */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg mb-5 max-w-sm"
        style={{ background: C.card, border: `1px solid ${C.border}` }}
      >
        <TbSearch className="h-4 w-4" style={{ color: C.textMuted }} />
        <input
          type="text" placeholder="Search products…"
          value={search} onChange={e => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm w-full"
          style={{ color: C.text }}
        />
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: C.card, borderBottom: `1px solid ${C.divider}` }}>
                {['Product', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: C.textMuted }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-sm" style={{ color: C.textMuted }}>
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-sm" style={{ color: C.textMuted }}>
                    No products found
                  </td>
                </tr>
              ) : filtered.map(product => (
                <tr key={product._id} style={{ borderBottom: `1px solid ${C.divider}`, background: '#1C0F05' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{product.emoji}</span>
                      <div>
                        <p className="font-semibold text-xs" style={{ color: C.text }}>{product.name}</p>
                        <p className="text-[10px]" style={{ color: C.textMuted }}>{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs capitalize" style={{ color: C.textMuted }}>
                    {product.category.replace('-', ' ')}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-bold" style={{ color: C.accent }}>${product.price}</p>
                    {product.oldPrice && (
                      <p className="text-[10px] line-through" style={{ color: C.textMuted }}>${product.oldPrice}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: product.inStock ? 'rgba(76,175,80,0.15)' : 'rgba(244,67,54,0.15)',
                        color:      product.inStock ? '#81C784' : '#EF9A9A',
                      }}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-1.5 rounded-lg transition-all"
                        style={{ background: 'rgba(212,163,115,0.1)', color: C.accent }}
                      >
                        <TbEdit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(product._id)}
                        className="p-1.5 rounded-lg transition-all"
                        style={{ background: 'rgba(244,67,54,0.1)', color: '#EF9A9A' }}
                      >
                        <TbTrash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add/Edit Form Modal ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div
            className="w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
            style={{ background: '#231208', border: `1px solid ${C.border}` }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold" style={{ color: C.text }}>
                {editing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ color: C.textMuted }}>
                <TbX className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 px-3 py-2 rounded-lg text-xs" style={{ background: 'rgba(244,67,54,0.1)', color: '#EF9A9A' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Product Name">
                  <input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </Field>
                <Field label="Emoji">
                  <input style={inputStyle} value={form.emoji} onChange={e => setForm({...form, emoji: e.target.value})} />
                </Field>
              </div>

              <Field label="Category">
                <select
                  style={inputStyle}
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c.replace('-', ' ')}</option>
                  ))}
                </select>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Price ($)">
                  <input type="number" style={inputStyle} value={form.price} onChange={e => setForm({...form, price: e.target.value})} required min="0" />
                </Field>
                <Field label="Old Price ($) — optional">
                  <input type="number" style={inputStyle} value={form.oldPrice} onChange={e => setForm({...form, oldPrice: e.target.value})} min="0" />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Badge">
                  <select style={inputStyle} value={form.badge} onChange={e => setForm({...form, badge: e.target.value})}>
                    {['', 'New', 'Sale', 'Bestseller', 'Trending', 'Top Rated'].map(b => (
                      <option key={b} value={b}>{b || 'None'}</option>
                    ))}
                  </select>
                </Field>
                <Field label="SKU">
                  <input style={inputStyle} value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} />
                </Field>
              </div>

              <Field label="Description">
                <textarea
                  rows={3} style={{...inputStyle, resize: 'none'}}
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                />
              </Field>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox" checked={form.inStock}
                  onChange={e => setForm({...form, inStock: e.target.checked})}
                />
                <span className="text-xs" style={{ color: C.text }}>In Stock</span>
              </label>

              <div className="flex gap-3 mt-2">
                <button
                  type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                  style={{ background: 'rgba(245,237,224,0.06)', color: C.textMuted }}
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={saving}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                  style={{ background: C.accent, color: '#1C0F05', opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? 'Saving…' : editing ? 'Update' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div
            className="w-full max-w-sm rounded-2xl p-6 text-center"
            style={{ background: '#231208', border: `1px solid ${C.border}` }}
          >
            <TbTrash className="h-10 w-10 mx-auto mb-3" style={{ color: '#EF9A9A' }} />
            <h2 className="text-base font-bold mb-1" style={{ color: C.text }}>Delete Product?</h2>
            <p className="text-xs mb-5" style={{ color: C.textMuted }}>This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                style={{ background: 'rgba(245,237,224,0.06)', color: C.textMuted }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                style={{ background: 'rgba(244,67,54,0.15)', color: '#EF9A9A' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts;