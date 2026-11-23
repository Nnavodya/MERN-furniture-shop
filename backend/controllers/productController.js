const mongoose = require('mongoose')
const Product = require('../models/Product')

const ALLOWED_PRODUCT_FIELDS = [
  'name',
  'category',
  'price',
  'oldPrice',
  'badge',
  'emoji',
  'description',
  'colors',
  'inStock',
  'sku',
  'imageUrl',
]

const escapeRegex = (str) => String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const pickProductFields = (body = {}) => {
  const data = {}
  for (const field of ALLOWED_PRODUCT_FIELDS) {
    if (body[field] !== undefined) {
      data[field] = body[field]
    }
  }
  return data
}

// ── GET /api/products — public, supports ?category= & ?search= ──
const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query
    const filter = {}

    if (typeof category === 'string' && category.trim()) {
      filter.category = category.trim()
    }
    if (typeof search === 'string' && search.trim()) {
      filter.name = { $regex: escapeRegex(search.trim()), $options: 'i' }
    }

    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message })
  }
}

// ── GET /api/products/:id — public ──
const getProductById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' })
    }
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message })
  }
}

// ── POST /api/products — admin only ──
const createProduct = async (req, res) => {
  try {
    const payload = pickProductFields(req.body)
    const product = await Product.create(payload)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ message: 'Failed to create product', error: err.message })
  }
}

// ── PUT /api/products/:id — admin only ──
const updateProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' })
    }
    const payload = pickProductFields(req.body)
    const product = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    })
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (err) {
    res.status(400).json({ message: 'Failed to update product', error: err.message })
  }
}

// ── DELETE /api/products/:id — admin only ──
const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' })
    }
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message })
  }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }