const express = require('express')
const router = express.Router()
const {
  createOrder, getMyOrders, getAllOrders, updateOrderStatus, getDashboardStats, validateCoupon,
} = require('../controllers/orderController')
const { protect, adminOnly } = require('../middleware/auth')

// ── Public coupon preview validation (authoritative check still runs in createOrder) ──
router.post('/validate-coupon', validateCoupon)

// ── Logged-in user ──
router.post('/', protect, createOrder)
router.get('/my', protect, getMyOrders)

// ── Admin only ──
router.get('/stats', protect, adminOnly, getDashboardStats)
router.get('/', protect, adminOnly, getAllOrders)
router.put('/:id/status', protect, adminOnly, updateOrderStatus)

module.exports = router