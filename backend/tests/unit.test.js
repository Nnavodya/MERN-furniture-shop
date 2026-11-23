const { validateAndCalcCoupon } = require('../config/coupons')
const { imageFileFilter, MAX_IMAGE_SIZE_BYTES } = require('../config/cloudinary')
const Product = require('../models/Product')
const Order = require('../models/Order')
const { createOrder } = require('../controllers/orderController')

describe('Backend Unit Tests', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('validateAndCalcCoupon handles FURNI20, WELCOME10, empty, and invalid codes', () => {
    expect(validateAndCalcCoupon('furni20', 250)).toEqual({
      couponCode: 'FURNI20',
      discountPercent: 20,
      discountAmount: 50,
    })
    expect(validateAndCalcCoupon('WELCOME10', 250)).toEqual({
      couponCode: 'WELCOME10',
      discountPercent: 10,
      discountAmount: 25,
    })
    expect(validateAndCalcCoupon('   ', 250)).toEqual({
      couponCode: null,
      discountPercent: 0,
      discountAmount: 0,
    })
    expect(validateAndCalcCoupon('BADCODE', 250)).toEqual({
      error: 'Invalid coupon code',
    })
  })

  test('imageFileFilter allows JPG/PNG/WEBP and rejects non-images', () => {
    expect(MAX_IMAGE_SIZE_BYTES).toBe(5 * 1024 * 1024)

    let cbErr = null
    let cbOk = null
    imageFileFilter({}, { mimetype: 'application/pdf' }, (err, ok) => {
      cbErr = err
      cbOk = ok
    })
    expect(cbErr).toBeTruthy()
    expect(cbErr.statusCode).toBe(400)
    expect(cbOk).toBe(false)

    cbErr = null
    cbOk = null
    imageFileFilter({}, { mimetype: 'image/png' }, (err, ok) => {
      cbErr = err
      cbOk = ok
    })
    expect(cbErr).toBeNull()
    expect(cbOk).toBe(true)
  })

  test('createOrder rolls back decremented stock if Order.create fails', async () => {
    const prodId = '507f1f77bcf86cd799439011'
    let currentStock = 5

    jest.spyOn(Product, 'find').mockResolvedValue([
      { _id: prodId, name: 'Test Chair', price: 100, stock: 5, inStock: true, emoji: '🪑' },
    ])
    jest.spyOn(Product, 'findOneAndUpdate').mockImplementation(async (q, u) => {
      currentStock += u.$inc.stock
      return { _id: prodId, stock: currentStock, inStock: true }
    })
    jest.spyOn(Product, 'findByIdAndUpdate').mockImplementation(async (id, u) => {
      if (u.$inc?.stock) currentStock += u.$inc.stock
      return { _id: prodId, stock: currentStock, inStock: true }
    })
    jest.spyOn(Product, 'updateOne').mockResolvedValue({})
    jest.spyOn(Order, 'create').mockRejectedValue(new Error('ValidationError'))

    const res = {
      statusCode: 200,
      body: null,
      status(c) { this.statusCode = c; return this },
      json(b) { this.body = b; return this },
    }

    await createOrder(
      {
        headers: {},
        user: { _id: '507f1f77bcf86cd799439012', email: 'u@test.com' },
        body: {
          items: [{ product: prodId, qty: 2 }],
          paymentMethod: 'cod',
          shippingAddress: {},
        },
      },
      res
    )

    expect(res.statusCode).toBe(400)
    expect(currentStock).toBe(5)
  })
})
