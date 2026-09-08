require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const authRoutes    = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes   = require('./routes/orderRoutes')

const app = express()

// ── Connect to MongoDB ──
connectDB()

// ── Middleware ──
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

// ── Routes ──
app.use('/api/auth',     authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders',   orderRoutes)

// ── Health check ──
app.get('/', (req, res) => {
  res.json({ message: 'FurniHub API is running' })
})

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong', error: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})