const mongoose = require('mongoose')
const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

const VALID_ORDER_STATUSES = Order.schema.path('status').enumValues

// Shipping rule (must match the frontend): free over $100, otherwise $25
const calcShipping = subtotal => (subtotal >= 100 ? 0 : 25)

// Helper: atomically restore stock for a list of { product, qty } entries
const restoreOrderStock = async (entries) => {
  for (const entry of entries) {
    const updated = await Product.findByIdAndUpdate(
      entry.product,
      { $inc: { stock: entry.qty }, $set: { inStock: true } },
      { new: true }
    )
    if (updated && updated.stock <= 0) {
      await Product.updateOne({ _id: entry.product }, { $set: { inStock: false } })
    }
  }
}

// ── POST /api/orders — logged-in user places an order ──
// Prices, totals, and stock are ALWAYS recomputed/enforced from the database.
const createOrder = async (req, res) => {
  const decremented = []
  try {
    const { items, shippingAddress, paymentMethod, paymentIntentId } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' })
    }
    if (!['card', 'cod'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'Invalid payment method' })
    }

    // Merge duplicate lines and validate product IDs and quantities
    const qtyById = new Map()
    for (const it of items) {
      if (!it || !it.product || !mongoose.Types.ObjectId.isValid(it.product)) {
        return res.status(400).json({ message: 'Invalid product ID' })
      }
      const qty = Number(it.qty)
      if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
        return res.status(400).json({ message: 'Invalid item quantity (must be an integer between 1 and 20)' })
      }
      const id = String(it.product)
      qtyById.set(id, (qtyById.get(id) || 0) + qty)
    }

    const productIds = [...qtyById.keys()]
    const products = await Product.find({ _id: { $in: productIds } })
    if (products.length !== qtyById.size) {
      return res.status(400).json({ message: 'One or more products no longer exist' })
    }

    const productById = new Map(products.map(p => [String(p._id), p]))

    // Atomically decrement stock per item to prevent concurrent overselling
    for (const id of productIds) {
      const qty = qtyById.get(id)
      const updated = await Product.findOneAndUpdate(
        { _id: id, stock: { $gte: qty } },
        { $inc: { stock: -qty } },
        { new: true }
      )

      if (!updated) {
        await restoreOrderStock(decremented)
        const existing = productById.get(id)
        const available = existing?.stock ?? 0
        return res.status(400).json({
          message: available <= 0
            ? `${existing?.name || 'Product'} is currently out of stock`
            : `Only ${available} unit(s) of ${existing?.name || 'product'} available in stock`,
        })
      }

      if (updated.stock === 0 && updated.inStock) {
        await Product.updateOne({ _id: id, stock: 0 }, { $set: { inStock: false } })
      }
      decremented.push({ product: id, qty })
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
    if (decremented.length > 0) {
      await restoreOrderStock(decremented).catch(() => {})
    }
    res.status(400).json({ message: err.name === 'ValidationError' ? err.message : 'Failed to place order' })
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID' })
    }

    const { status } = req.body
    if (!VALID_ORDER_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' })
    }

    const existing = await Order.findById(req.params.id)
    if (!existing) {
      return res.status(404).json({ message: 'Order not found' })
    }

    if (existing.status === 'cancelled' && status !== 'cancelled') {
      return res.status(400).json({ message: 'Cancelled orders cannot be reopened' })
    }
    if (existing.status === 'delivered' && status === 'cancelled') {
      return res.status(400).json({ message: 'Delivered orders cannot be cancelled' })
    }

    if (status === 'cancelled') {
      // Atomically claim cancellation + stock restoration once
      const cancelledOrder = await Order.findOneAndUpdate(
        { _id: req.params.id, status: { $ne: 'cancelled' }, stockRestored: { $ne: true } },
        { $set: { status: 'cancelled', stockRestored: true } },
        { new: true, runValidators: true }
      )

      if (!cancelledOrder) {
        return res.json(existing)
      }

      await restoreOrderStock(cancelledOrder.items.map(i => ({ product: i.product, qty: i.qty })))
      return res.json(cancelledOrder)
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
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