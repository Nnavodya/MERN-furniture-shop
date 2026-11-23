const express = require('express')
const router = express.Router()
const { upload, cloudinary } = require('../config/cloudinary')
const { protect, adminOnly } = require('../middleware/auth')

const handleSingleImageUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (!err) return next()
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Image must be 5 MB or smaller' })
    }
    return res.status(err.statusCode || 400).json({ message: err.message || 'Invalid image upload' })
  })
}

// ── POST /api/upload — admin only, single image ──
router.post('/', protect, adminOnly, handleSingleImageUpload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' })
  }
  res.json({
    url:       req.file.path,
    public_id: req.file.filename,
  })
})

// ── DELETE /api/upload/:public_id — admin only ──
router.delete('/:public_id', protect, adminOnly, async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.params.public_id)
    res.json({ message: 'Image deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete image' })
  }
})

module.exports = router;