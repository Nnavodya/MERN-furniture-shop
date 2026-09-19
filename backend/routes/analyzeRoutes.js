const express = require('express')
const router = express.Router()
const multer = require('multer')
const { GoogleGenerativeAI } = require('@google/generative-ai')

const upload = multer({ storage: multer.memoryStorage() })
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// ── POST /api/analyze — analyze room photo, suggest furniture categories ──
router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image provided' })
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' })

    const imagePart = {
      inlineData: {
        data:     req.file.buffer.toString('base64'),
        mimeType: req.file.mimetype,
      },
    }

    const prompt = `Analyze this room photo and respond with ONLY a valid JSON object (no markdown, no backticks).
    
    Return this exact structure:
    {
      "roomType": "living room",
      "style": "modern minimalist",
      "suggestedCategories": ["living-room", "lighting", "decor"],
      "colors": ["#F5F5F5", "#8B5E2E", "#2C2C2C"],
      "description": "A bright modern living room with neutral tones..."
    }
    
    Categories must be from: living-room, bedroom, dining, office, outdoor, storage, lighting, decor`

    const result = await model.generateContent([prompt, imagePart])
    const text   = result.response.text().trim()

    // ── Strip markdown fences if present ──
    const clean = text.replace(/```json|```/g, '').trim()
    const data  = JSON.parse(clean)

    res.json(data)
  } catch (err) {
    console.error('Gemini error:', err.message)
    res.status(500).json({ message: 'Failed to analyze image', error: err.message })
  }
})

module.exports = router;