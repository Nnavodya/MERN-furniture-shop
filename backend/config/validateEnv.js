// Fail fast at startup if required environment variables are missing/weak.
const required = ['MONGODB_URI', 'JWT_SECRET']
const optional = ['CLIENT_URL', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET', 'GEMINI_API_KEY']

const validateEnv = () => {
  const missing = required.filter(key => !process.env[key])
  if (missing.length) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`)
    process.exit(1)
  }

  if (process.env.JWT_SECRET.length < 16) {
    console.error('❌ JWT_SECRET is too short (use at least 16 random characters)')
    process.exit(1)
  }

  const missingOptional = optional.filter(key => !process.env[key])
  if (missingOptional.length) {
    console.warn(`⚠️  Optional variables not set (related features may not work): ${missingOptional.join(', ')}`)
  }
}

module.exports = validateEnv;