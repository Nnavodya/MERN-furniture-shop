require('dotenv').config()
const validateEnv = require('./config/validateEnv')
validateEnv() // exit early if config is missing

const express   = require('express')
const cors      = require('cors')
const helmet    = require('helmet')
const rateLimit = require('express-rate-limit')
const connectDB = require('./config/db')

const authRoutes    = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes   = require('./routes/orderRoutes')
const uploadRoutes  = require('./routes/uploadRoutes')
const analyzeRoutes = require('./routes/analyzeRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

const app = express()
const isProd = process.env.NODE_ENV === 'production'

// ── Connect to MongoDB ──
connectDB()

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

app.use('/api', limiter(15, 300, 'Too many requests, please try again later'))
const authLimiter    = limiter(15, 20, 'Too many login attempts, please try again in 15 minutes')
const analyzeLimiter = limiter(15, 10, 'Too many room analyses, please try again later')

// ── Routes ──
app.use('/api/auth',     authLimiter,    authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders',   orderRoutes)
app.use('/api/upload',   uploadRoutes)
app.use('/api/analyze',  analyzeLimiter, analyzeRoutes)
app.use('/api/payment',  paymentRoutes)

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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})