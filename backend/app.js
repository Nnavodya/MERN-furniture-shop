const express   = require('express')
const cors      = require('cors')
const helmet    = require('helmet')
const rateLimit = require('express-rate-limit')

const authRoutes    = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes   = require('./routes/orderRoutes')
const uploadRoutes  = require('./routes/uploadRoutes')
const analyzeRoutes = require('./routes/analyzeRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const contactRoutes = require('./routes/contactRoutes')

const app = express()
const isProd = process.env.NODE_ENV === 'production'
app.set('trust proxy', 1)

// ── Security middleware ──
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '1mb' }))

// ── Rate limiting ──
const limiter = (windowMinutes, max, message) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message },
  })

if (process.env.NODE_ENV !== 'test') {
  app.use('/api', limiter(15, 300, 'Too many requests, please try again later'))
}
const authLimiter    = process.env.NODE_ENV === 'test' ? (req, res, next) => next() : limiter(15, 20, 'Too many login attempts, please try again in 15 minutes')
const analyzeLimiter = process.env.NODE_ENV === 'test' ? (req, res, next) => next() : limiter(15, 10, 'Too many room analyses, please try again later')

// ── Routes ──
app.use('/api/auth',     authLimiter,    authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders',   orderRoutes)
app.use('/api/upload',   uploadRoutes)
app.use('/api/analyze',  analyzeLimiter, analyzeRoutes)
app.use('/api/payment',  paymentRoutes)
app.use('/api/contact',  contactRoutes)

// ── Health check ──
app.get('/', (req, res) => {
  res.json({ message: 'FurniHub API is running' })
})

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// ── Global error handler (no internal details in production) ──
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: 'Something went wrong',
    ...(isProd ? {} : { error: err.message }),
  })
})

module.exports = app
