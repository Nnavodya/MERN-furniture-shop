const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const sendEmail = require('../utils/sendEmail')

// ── Generate JWT token ──
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// ── POST /api/auth/signup ──
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' })
    }

    // Public signup ALWAYS creates a normal user. Promote admins with: npm run make-admin -- <email>
    const user = await User.create({ name, email, password, role: 'user' })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: 'Signup failed' })
  }
}

// ── POST /api/auth/login ──
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: 'Login failed' })
  }
}

// ── GET /api/auth/me ── (requires protect middleware)
const getMe = async (req, res) => {
  res.json(req.user)
}

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex')

// ── POST /api/auth/forgot-password ──
// Always returns the same message so attackers can't discover which emails are registered.
const forgotPassword = async (req, res) => {
  const genericResponse = { message: 'If an account with that email exists, a reset link has been sent.' }

  try {
    const email = String(req.body.email || '').toLowerCase().trim()
    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    const user = await User.findOne({ email })
    if (!user) return res.json(genericResponse)

    const resetToken = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken   = hashToken(resetToken)
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000 // 15 minutes
    await user.save({ validateBeforeSave: false })

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'
    const resetUrl  = `${clientUrl}/reset-password/${resetToken}`

    try {
      await sendEmail({
        to: user.email,
        subject: 'Reset your FurniHub password',
        text: `Hi ${user.name},\n\nUse this link to reset your password (valid for 15 minutes):\n${resetUrl}\n\nIf you didn't request this, you can ignore this email.`,
        html: `<p>Hi ${user.name},</p><p>Click the button below to reset your password. This link is valid for 15 minutes.</p><p><a href="${resetUrl}" style="background:#8B5E2E;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">Reset password</a></p><p>If you didn't request this, you can ignore this email.</p>`,
      })
    } catch (mailErr) {
      console.error('Reset email failed:', mailErr.message)
      user.resetPasswordToken   = undefined
      user.resetPasswordExpires = undefined
      await user.save({ validateBeforeSave: false })
    }

    res.json(genericResponse)
  } catch (err) {
    res.status(500).json({ message: 'Could not process request' })
  }
}

// ── POST /api/auth/reset-password/:token ──
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const user = await User.findOne({
      resetPasswordToken:   hashToken(req.params.token),
      resetPasswordExpires: { $gt: Date.now() },
    }).select('+resetPasswordToken +resetPasswordExpires')

    if (!user) {
      return res.status(400).json({ message: 'Reset link is invalid or has expired' })
    }

    user.password = password // hashed by the pre-save hook
    user.resetPasswordToken   = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    res.json({ message: 'Password updated. You can now log in.' })
  } catch (err) {
    res.status(500).json({ message: 'Could not reset password' })
  }
}

module.exports = { signup, login, getMe, forgotPassword, resetPassword }