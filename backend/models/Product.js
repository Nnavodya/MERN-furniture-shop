const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['living-room', 'bedroom', 'dining', 'office', 'outdoor', 'storage', 'lighting', 'decor'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    oldPrice: {
      type: Number,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      enum: ['', 'New', 'Sale', 'Bestseller', 'Best Seller', 'Top Rated', 'Trending'],
      default: '',
    },
    emoji: {
      type: String,
      default: '🪑',
    },
    description: {
      type: String,
      default: '',
    },
    colors: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)