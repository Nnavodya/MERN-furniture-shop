const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  qty:      { type: Number, required: true, min: 1 },
  emoji:    { type: String, default: '🪑' },
})

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: v => Array.isArray(v) && v.length > 0,
    },
    shippingAddress: {
      fullName:   { type: String, required: true },
      email:      { type: String, required: true },
      phone:      String,
      address:    { type: String, required: true },
      city:       { type: String, required: true },
      postalCode: { type: String, required: true },
      country:    { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'cod'],
      required: true,
    },
    subtotal:     { type: Number, required: true },
    shippingCost: { type: Number, required: true, default: 0 },
    total:        { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)