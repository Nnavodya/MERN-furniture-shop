const express = require('express')
const router  = express.Router()
const { protect } = require('../middleware/auth')

// ── POST /api/payment/create-intent ──
// Card payments are currently unavailable; simulated intents are disabled.
router.post('/create-intent', protect, (req, res) => {
  return res.status(503).json({
    message: 'Card payments are currently unavailable. Please use Cash on Delivery.',
  })
})

module.exports = router;