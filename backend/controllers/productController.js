const Product = require('../models/Product')

// ── GET /api/products — public, supports ?category= search ──
const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query
    const filter = {}

    if (category) filter.category = category
    if (search) filter.name = { $regex: search, $options: 'i' }

    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message })
  }
}

// ── GET /api/products/:id — public ──
const getProductById = async (req, res) => {
  try {
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
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ message: 'Failed to create product', error: err.message })
  }
}

// ── PUT /api/products/:id — admin only ──
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
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