const express = require('express')
const router  = express.Router()
const { protect } = require('../middleware/auth')

// ── POST /api/payment/create-intent ──
// Simulated payment intent — replace with real Stripe when live keys available
router.post('/create-intent', protect, async (req, res) => {
  try {
    const { amount } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' })
    }

    // ── Simulated client secret (real Stripe: stripe.paymentIntents.create) ──
    const simulatedClientSecret = `pi_demo_${Date.now()}_secret_${Math.random().toString(36).slice(2)}`

    res.json({
      clientSecret:    simulatedClientSecret,
      amount,
      currency:        'usd',
      publishableKey:  process.env.STRIPE_PUBLISHABLE_KEY,
    })
  } catch (err) {
    res.status(500).json({ message: 'Payment intent failed', error: err.message })
  }
})

module.exports = router;