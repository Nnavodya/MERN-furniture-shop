const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

// Shipping rule (must match the frontend): free over $100, otherwise $25
const calcShipping = subtotal => (subtotal >= 100 ? 0 : 25)

// ── POST /api/orders — logged-in user places an order ──
// Prices and totals are ALWAYS recomputed from the database; client values are ignored.
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, paymentIntentId } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' })
    }
    if (!['card', 'cod'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'Invalid payment method' })
    }

    // Merge duplicate lines and validate quantities
    const qtyById = new Map()
    for (const it of items) {
      const qty = Number(it.qty)
      if (!it.product || !Number.isInteger(qty) || qty < 1 || qty > 20) {
        return res.status(400).json({ message: 'Invalid item or quantity' })
      }
      const id = String(it.product)
      qtyById.set(id, (qtyById.get(id) || 0) + qty)
    }

    const products = await Product.find({ _id: { $in: [...qtyById.keys()] } })
    if (products.length !== qtyById.size) {
      return res.status(400).json({ message: 'One or more products no longer exist' })
    }

    const orderItems = products.map(p => ({
      product: p._id,
      name:    p.name,
      price:   p.price,
      qty:     qtyById.get(String(p._id)),
      emoji:   p.emoji || '🪑',
    }))

    const subtotal     = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0)
    const shippingCost = calcShipping(subtotal)
    const total        = subtotal + shippingCost

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      paymentIntentId: paymentMethod === 'card' ? paymentIntentId : undefined,
      subtotal,
      shippingCost,
      total,
    })

    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ message: 'Failed to place order' })
  }
}

// ── GET /api/orders/my — logged-in user's own orders ──
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message })
  }
}

// ── GET /api/orders — admin only, all orders ──
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message })
  }
}

// ── PUT /api/orders/:id/status — admin only ──
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json(order)
  } catch (err) {
    res.status(400).json({ message: 'Failed to update order status', error: err.message })
  }
}

// ── GET /api/orders/stats — admin dashboard summary ──
const getDashboardStats = async (req, res) => {
  try {
    const [totalProducts, totalOrders, totalUsers, orders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Order.find().select('total status createdAt'),
    ])

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

    const statusBreakdown = orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1
      return acc
    }, {})

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
      statusBreakdown,
    })
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: err.message })
  }
}

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus, getDashboardStats }