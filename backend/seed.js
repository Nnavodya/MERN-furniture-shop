// backend/seed.js
require('dotenv').config()
const mongoose = require('mongoose')
const Product  = require('./models/Product')

const products = [
  {
    name: 'Linen Sofa', category: 'living-room', price: 899, oldPrice: 1099,
    rating: 4.8, reviews: 128, badge: '', emoji: '🛋️', inStock: true, sku: 'FRN-LS-001',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    description: 'A relaxed, oversized sofa upholstered in breathable linen-blend fabric.',
    colors: ['#A8967C', '#7C7468', '#3D3A36'],
  },
  {
    name: 'Oak Dining Table', category: 'dining', price: 1299, oldPrice: null,
    rating: 4.6, reviews: 84, badge: 'New', emoji: '🪑', inStock: true, sku: 'FRN-ODT-002',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop',
    description: 'Solid oak dining table with a hand-rubbed finish. Seats six comfortably.',
    colors: ['#8B5E2E', '#5C3E20'],
  },
  {
    name: 'Velvet Armchair', category: 'living-room', price: 549, oldPrice: 649,
    rating: 4.9, reviews: 203, badge: 'Bestseller', emoji: '🪑', inStock: true, sku: 'FRN-VA-003',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    description: 'A statement armchair in plush velvet with brass-finished legs.',
    colors: ['#6B4226', '#0F4C5C', '#5C0E1A'],
  },
  {
    name: 'Walnut Bookshelf', category: 'storage', price: 749, oldPrice: null,
    rating: 4.5, reviews: 67, badge: '', emoji: '📚', inStock: true, sku: 'FRN-WB-004',
    imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=600&fit=crop',
    description: 'Five-tier open bookshelf in rich walnut veneer.',
    colors: ['#5C3E20', '#3D3A36'],
  },
  {
    name: 'Rattan Bed Frame', category: 'bedroom', price: 1099, oldPrice: 1299,
    rating: 4.7, reviews: 91, badge: 'Sale', emoji: '🛏️', inStock: true, sku: 'FRN-RBF-005',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    description: 'Hand-woven rattan headboard paired with a solid wood frame.',
    colors: ['#C8A874', '#A8967C'],
  },
  {
    name: 'Marble Coffee Table', category: 'living-room', price: 699, oldPrice: null,
    rating: 4.4, reviews: 145, badge: 'New', emoji: '🪨', inStock: true, sku: 'FRN-MCT-006',
    imageUrl: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=800&h=600&fit=crop',
    description: 'A round coffee table topped with genuine marble on a brass-finished base.',
    colors: ['#E8E4DD', '#3D3A36'],
  },
  {
    name: 'Pendant Light', category: 'lighting', price: 299, oldPrice: null,
    rating: 4.8, reviews: 176, badge: '', emoji: '💡', inStock: true, sku: 'FRN-PL-007',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop',
    description: 'Minimalist dome pendant light in matte black.',
    colors: ['#1A1A1A', '#8B5E2E'],
  },
  {
    name: 'Accent Mirror', category: 'decor', price: 449, oldPrice: 549,
    rating: 4.3, reviews: 52, badge: 'Sale', emoji: '🪞', inStock: false, sku: 'FRN-AM-008',
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&h=600&fit=crop',
    description: 'An arched floor mirror with a slim brass frame.',
    colors: ['#C9A04A', '#3D3A36'],
  },
  {
    name: 'Outdoor Lounger', category: 'outdoor', price: 799, oldPrice: null,
    rating: 4.6, reviews: 38, badge: '', emoji: '🏖️', inStock: true, sku: 'FRN-OL-009',
    imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop',
    description: 'Weather-resistant teak lounger with quick-dry cushions.',
    colors: ['#A8967C', '#3D3A36'],
  },
  {
    name: 'Filing Cabinet', category: 'office', price: 399, oldPrice: null,
    rating: 4.2, reviews: 29, badge: '', emoji: '🗄️', inStock: true, sku: 'FRN-FC-010',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop',
    description: 'Two-drawer locking filing cabinet with soft-close glides.',
    colors: ['#3D3A36', '#E8E4DD'],
  },
  {
    name: 'Bedside Table', category: 'bedroom', price: 349, oldPrice: null,
    rating: 4.7, reviews: 88, badge: 'Bestseller', emoji: '🪑', inStock: true, sku: 'FRN-BT-011',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
    description: 'A compact two-drawer bedside table in solid oak with brass pulls.',
    colors: ['#8B5E2E', '#5C3E20'],
  },
  {
    name: 'Woven Rug', category: 'decor', price: 249, oldPrice: 329,
    rating: 4.5, reviews: 114, badge: 'Sale', emoji: '🟫', inStock: true, sku: 'FRN-WR-012',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=600&fit=crop',
    description: 'A hand-loomed wool-blend rug in a neutral geometric pattern.',
    colors: ['#C8A874', '#A8967C', '#3D3A36'],
  },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB connected')
    await Product.deleteMany({})
    console.log('🗑️  Cleared existing products')
    const inserted = await Product.insertMany(products)
    console.log(`✅ Inserted ${inserted.length} products with images`)
    await mongoose.disconnect()
    console.log('👋 Seed complete!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
}

seed();