require('dotenv').config()
const validateEnv = require('./config/validateEnv')
validateEnv() // exit early if config is missing

const connectDB = require('./config/db')
const app       = require('./app')

// ── Connect to MongoDB ──
connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})