// Usage (from backend/):  npm run make-admin -- user@example.com
require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')

const email = (process.argv[2] || '').toLowerCase()
if (!email) {
  console.error('Usage: npm run make-admin -- <email>')
  process.exit(1)
}

;(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    const user = await User.findOneAndUpdate({ email }, { role: 'admin' }, { new: true })
    console.log(user ? `✅ ${user.email} is now an admin` : `❌ No user found with email ${email}`)
  } catch (err) {
    console.error('Failed:', err.message)
  } finally {
    await mongoose.disconnect()
  }
})()