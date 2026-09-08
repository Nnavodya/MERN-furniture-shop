const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

// ── POST /api/orders — logged-in user places an order ──
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, shippingCost, total } = req.body

    if (!items?.length) {
      return res.status(400).json({ message: 'Order must contain at least one item' })
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost,
      total,
    })

    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ message: 'Failed to place order', error: err.message })
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