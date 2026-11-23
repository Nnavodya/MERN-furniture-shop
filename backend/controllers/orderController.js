const mongoose = require('mongoose')
const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')
const sendEmail = require('../utils/sendEmail')
const { validateAndCalcCoupon } = require('../config/coupons')

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

// Helper: send order confirmation email once (non-blocking; never throws)
const sendOrderConfirmationEmail = async (order, fallbackEmail) => {
  if (!order || order.confirmationEmailSent) return false
  const recipient = order.shippingAddress?.email || fallbackEmail
  if (!recipient) return false

  const orderRef = String(order._id).slice(-6).toUpperCase()
  const linesText = (order.items || [])
    .map(i => `- ${i.name} x${i.qty}: $${(i.price * i.qty).toLocaleString()}`)
    .join('\n')
  const addr = order.shippingAddress || {}

  try {
    await sendEmail({
      to: recipient,
      subject: `FurniHub Order Confirmation #${orderRef}`,
      text: [
        `Hi ${addr.fullName || 'Customer'},`,
        '',
        `Thank you for your order #${orderRef}!`,
        '',
        'Items:',
        linesText,
        '',
        `Subtotal: $${order.subtotal.toLocaleString()}`,
        ...(order.discountAmount > 0
          ? [`Discount${order.couponCode ? ` (${order.couponCode})` : ''}: -$${order.discountAmount.toLocaleString()}`]
          : []),
        `Shipping: ${order.shippingCost === 0 ? 'Free' : `$${order.shippingCost}`}`,
        `Total: $${order.total.toLocaleString()}`,
        `Payment Method: Cash on Delivery (Payment Status: ${order.paymentStatus})`,
        '',
        `Shipping Address: ${addr.address}, ${addr.city} ${addr.postalCode}, ${addr.country}`,
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;color:#2C1A0E;max-width:560px">
          <h2 style="color:#8B5E2E">Order Confirmed (#${orderRef})</h2>
          <p>Hi ${addr.fullName || 'Customer'}, thank you for shopping with FurniHub!</p>
          <ul>${(order.items || []).map(i => `<li>${i.name} &times; ${i.qty} — <strong>$${(i.price * i.qty).toLocaleString()}</strong></li>`).join('')}</ul>
          <p><strong>Subtotal:</strong> $${order.subtotal.toLocaleString()}<br/>
          ${order.discountAmount > 0 ? `<strong>Discount${order.couponCode ? ` (${order.couponCode})` : ''}:</strong> -$${order.discountAmount.toLocaleString()}<br/>` : ''}
          <strong>Shipping:</strong> ${order.shippingCost === 0 ? 'Free' : `$${order.shippingCost}`}<br/>
          <strong>Total:</strong> $${order.total.toLocaleString()}</p>
          <p><strong>Payment Method:</strong> Cash on Delivery (${order.paymentStatus})</p>
          <p><strong>Shipping Address:</strong> ${addr.address}, ${addr.city} ${addr.postalCode}, ${addr.country}</p>
        </div>
      `,
    })
    await Order.updateOne(
      { _id: order._id, confirmationEmailSent: false },
      { $set: { confirmationEmailSent: true } }
    )
    return true
  } catch (mailErr) {
    console.error('Order confirmation email failed:', mailErr.message)
    return false
  }
}

// ── POST /api/orders — logged-in user places an order ──
// Prices, totals, paymentStatus, and stock are ALWAYS recomputed/enforced from the database.
const createOrder = async (req, res) => {
  const decremented = []
  const rawKey = req.headers['idempotency-key'] || req.body.idempotencyKey
  const idempotencyKey = typeof rawKey === 'string' && rawKey.trim() ? rawKey.trim() : undefined

  try {
    const { items, shippingAddress, paymentMethod } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' })
    }
    if (paymentMethod === 'card') {
      return res.status(400).json({ message: 'Card payments are currently unavailable. Please select Cash on Delivery.' })
    }
    if (paymentMethod !== 'cod') {
      return res.status(400).json({ message: 'Invalid payment method' })
    }

    // Pre-validate coupon syntax/existence before modifying stock
    const preCoupon = validateAndCalcCoupon(req.body.couponCode, 0)
    if (preCoupon.error) {
      return res.status(400).json({ message: preCoupon.error })
    }

    // Idempotency check: return existing order without re-decrementing stock or re-sending email
    if (idempotencyKey) {
      const existingOrder = await Order.findOne({ user: req.user._id, idempotencyKey })
      if (existingOrder) {
        return res.status(200).json(existingOrder)
      }
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

    const subtotal       = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0)
    const couponResult   = validateAndCalcCoupon(req.body.couponCode, subtotal)
    const discountAmount = couponResult.discountAmount
    const shippingCost   = calcShipping(subtotal - discountAmount)
    const total          = subtotal - discountAmount + shippingCost

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      ...(idempotencyKey ? { idempotencyKey } : {}),
      subtotal,
      couponCode: couponResult.couponCode,
      discountAmount,
      shippingCost,
      total,
    })

    const emailSent = await sendOrderConfirmationEmail(order, req.user.email)
    const resultObj = typeof order.toObject === 'function' ? order.toObject() : { ...order }
    resultObj.confirmationEmailSent = emailSent

    res.status(201).json(resultObj)
  } catch (err) {
    if (decremented.length > 0) {
      await restoreOrderStock(decremented).catch(() => {})
    }
    if (err.code === 11000 && idempotencyKey) {
      const existingOrder = await Order.findOne({ user: req.user._id, idempotencyKey }).catch(() => null)
      if (existingOrder) {
        return res.status(200).json(existingOrder)
      }
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

// ── POST /api/orders/validate-coupon — validate coupon & calculate preview discount ──
const validateCoupon = async (req, res) => {
  try {
    const { code, items } = req.body
    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({ message: 'Coupon code is required' })
    }

    let subtotal = 0
    if (Array.isArray(items) && items.length > 0) {
      const validIds = items
        .filter(i => i && i.product && mongoose.Types.ObjectId.isValid(i.product))
        .map(i => String(i.product))
      if (validIds.length > 0) {
        const products = await Product.find({ _id: { $in: validIds } }).select('price')
        const priceById = new Map(products.map(p => [String(p._id), p.price]))
        subtotal = items.reduce((sum, i) => {
          const p = priceById.get(String(i.product))
          const q = Number(i.qty)
          return p && Number.isInteger(q) && q > 0 ? sum + p * q : sum
        }, 0)
      }
    }

    const result = validateAndCalcCoupon(code, subtotal)
    if (result.error) {
      return res.status(400).json({ message: result.error })
    }

    res.json({
      valid:           true,
      code:            result.couponCode,
      discountPercent: result.discountPercent,
      discountAmount:  result.discountAmount,
      subtotal,
    })
  } catch (err) {
    res.status(500).json({ message: 'Failed to validate coupon' })
  }
}

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus, getDashboardStats, validateCoupon }