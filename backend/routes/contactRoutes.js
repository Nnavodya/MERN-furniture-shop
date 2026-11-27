const express = require('express')
const router = express.Router()
const sendEmail = require('../utils/sendEmail')
const Newsletter = require('../models/Newsletter')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ── POST /api/contact — send contact message ──
router.post('/', async (req, res) => {
  try {
    const name    = typeof req.body.name    === 'string' ? req.body.name.trim()    : ''
    const email   = typeof req.body.email   === 'string' ? req.body.email.trim()   : ''
    const subject = typeof req.body.subject === 'string' ? req.body.subject.trim() : ''
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : ''

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' })
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' })
    }

    const recipient = process.env.EMAIL_USER || 'support@furnihub.com'
    await sendEmail({
      to: recipient,
      subject: `[FurniHub Contact] ${subject || 'Customer Inquiry'}`,
      text: `From: ${name} <${email}>\nSubject: ${subject || 'N/A'}\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Subject:</strong> ${subject || 'N/A'}</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    })

    res.json({ message: 'Message sent successfully' })
  } catch (err) {
    console.error('Contact form error:', err.message)
    res.status(500).json({ message: 'Failed to send message. Please try again later.' })
  }
})

// ── POST /api/contact/newsletter — subscribe email ──
router.post('/newsletter', async (req, res) => {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' })
    }

    await Newsletter.findOneAndUpdate(
      { email },
      { $setOnInsert: { email } },
      { upsert: true, new: true }
    )

    res.json({ message: 'Subscribed to newsletter' })
  } catch (err) {
    console.error('Newsletter error:', err.message)
    res.status(500).json({ message: 'Failed to subscribe. Please try again.' })
  }
})

module.exports = router
