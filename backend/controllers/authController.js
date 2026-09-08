const jwt = require('jsonwebtoken')
const User = require('../models/User')

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

    // First registered user becomes admin automatically (convenience for dev/demo)
    const userCount = await User.countDocuments()
    const role = userCount === 0 ? 'admin' : 'user'

    const user = await User.create({ name, email, password, role })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message })
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
    res.status(500).json({ message: 'Login failed', error: err.message })
  }
}

// ── GET /api/auth/me ── (requires protect middleware)
const getMe = async (req, res) => {
  res.json(req.user)
}

module.exports = { signup, login, getMe }