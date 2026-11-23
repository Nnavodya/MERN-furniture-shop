process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test_jwt_secret_at_least_16_chars'
delete process.env.EMAIL_USER
delete process.env.EMAIL_PASS

const mongoose = require('mongoose')
const request = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server')

const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
}, 60000)

afterEach(async () => {
  if (mongoose.connection.readyState !== 1) return
  const collections = mongoose.connection.collections
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({})
  }
})

afterAll(async () => {
  await mongoose.disconnect()
  if (mongoServer) await mongoServer.stop()
})

const createCustomerAndAdmin = async () => {
  const custRes = await request(app).post('/api/auth/signup').send({
    name: 'Alice Customer',
    email: 'alice@example.com',
    password: 'password123',
    role: 'admin', // attempt privilege escalation
  })
  const adminSignup = await request(app).post('/api/auth/signup').send({
    name: 'Bob Admin',
    email: 'admin@example.com',
    password: 'password123',
  })
  await User.findByIdAndUpdate(adminSignup.body._id, { role: 'admin' })
  const adminLogin = await request(app).post('/api/auth/login').send({
    email: 'admin@example.com',
    password: 'password123',
  })
  return {
    customer: custRes.body,
    customerToken: custRes.body.token,
    adminToken: adminLogin.body.token,
  }
}

const sampleAddress = {
  fullName: 'Alice Customer',
  email: 'alice@example.com',
  phone: '+94712345678',
  address: '123 Main St',
  city: 'Colombo',
  postalCode: '00100',
  country: 'Sri Lanka',
}

describe('FurniHub API Integration Tests (Isolated MongoMemoryServer)', () => {
  describe('Authentication & Authorization', () => {
    test('registers user with role=user, logs in, rejects bad password, protects routes', async () => {
      const { customer, customerToken } = await createCustomerAndAdmin()
      expect(customer.role).toBe('user')
      expect(customer.token).toBeTruthy()

      const badLogin = await request(app).post('/api/auth/login').send({
        email: 'alice@example.com',
        password: 'wrongpassword',
      })
      expect(badLogin.status).toBe(401)

      const unauthMe = await request(app).get('/api/auth/me')
      expect(unauthMe.status).toBe(401)

      const authMe = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${customerToken}`)
      expect(authMe.status).toBe(200)
      expect(authMe.body.email).toBe('alice@example.com')

      const nonAdminStats = await request(app)
        .get('/api/orders/stats')
        .set('Authorization', `Bearer ${customerToken}`)
      expect(nonAdminStats.status).toBe(403)
    })
  })

  describe('Products', () => {
    test('lists, searches safely, validates IDs, blocks mass assignment & invalid stock', async () => {
      const { adminToken } = await createCustomerAndAdmin()

      const created = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Linen Sofa (Special)',
          category: 'living-room',
          price: 500,
          stock: 10,
          rating: 5,
          reviews: 999,
        })
      expect(created.status).toBe(201)
      expect(created.body.stock).toBe(10)
      expect(created.body.inStock).toBe(true)
      expect(created.body.rating).toBe(0)
      expect(created.body.reviews).toBe(0)

      const badStock = await request(app)
        .put(`/api/products/${created.body._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ stock: -3 })
      expect(badStock.status).toBe(400)

      const all = await request(app).get('/api/products')
      expect(all.status).toBe(200)
      expect(all.body).toHaveLength(1)

      const searched = await request(app).get('/api/products').query({ search: '(Special)' })
      expect(searched.status).toBe(200)
      expect(searched.body).toHaveLength(1)

      const badId = await request(app).get('/api/products/not-an-object-id')
      expect(badId.status).toBe(400)
    })
  })

  describe('Orders, Inventory, Payments, Coupons & Admin', () => {
    test('COD order, coupon calculation, tampered totals ignored, idempotency, card rejected', async () => {
      const { customerToken } = await createCustomerAndAdmin()
      const product = await Product.create({
        name: 'Oak Chair',
        category: 'dining',
        price: 100,
        stock: 10,
        inStock: true,
      })

      // Card payment disabled
      const intentRes = await request(app)
        .post('/api/payment/create-intent')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ amount: 100 })
      expect(intentRes.status).toBe(503)

      const cardOrder = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          items: [{ product: product._id, qty: 1 }],
          shippingAddress: sampleAddress,
          paymentMethod: 'card',
        })
      expect(cardOrder.status).toBe(400)

      // Invalid coupon rejected without touching stock
      const badCouponOrder = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          items: [{ product: product._id, qty: 1 }],
          shippingAddress: sampleAddress,
          paymentMethod: 'cod',
          couponCode: 'INVALID99',
        })
      expect(badCouponOrder.status).toBe(400)

      // Valid COD order with FURNI20 + tampered client fields
      const orderPayload = {
        items: [{ product: product._id, qty: 2, price: 1 }],
        shippingAddress: sampleAddress,
        paymentMethod: 'cod',
        paymentStatus: 'paid',
        couponCode: 'furni20',
        discountAmount: 199,
        total: 1,
        idempotencyKey: 'idem-001',
      }
      const orderRes = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(orderPayload)

      expect(orderRes.status).toBe(201)
      expect(orderRes.body.paymentStatus).toBe('pending')
      expect(orderRes.body.couponCode).toBe('FURNI20')
      expect(orderRes.body.subtotal).toBe(200)
      expect(orderRes.body.discountAmount).toBe(40)
      expect(orderRes.body.shippingCost).toBe(0)
      expect(orderRes.body.total).toBe(160)

      const updatedProd = await Product.findById(product._id)
      expect(updatedProd.stock).toBe(8)

      // Duplicate idempotencyKey returns existing order without extra deduction
      const dupRes = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(orderPayload)
      expect(dupRes.status).toBe(200)
      expect(dupRes.body._id).toBe(orderRes.body._id)
      expect((await Product.findById(product._id)).stock).toBe(8)
    })

    test('concurrent orders prevent overselling & invalid quantities/IDs rejected', async () => {
      const { customerToken } = await createCustomerAndAdmin()
      const product = await Product.create({
        name: 'Walnut Desk',
        category: 'office',
        price: 300,
        stock: 5,
        inStock: true,
      })

      const badQty = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          items: [{ product: product._id, qty: 0 }],
          shippingAddress: sampleAddress,
          paymentMethod: 'cod',
        })
      expect(badQty.status).toBe(400)

      const [r1, r2] = await Promise.all([
        request(app)
          .post('/api/orders')
          .set('Authorization', `Bearer ${customerToken}`)
          .send({
            items: [{ product: product._id, qty: 3 }],
            shippingAddress: sampleAddress,
            paymentMethod: 'cod',
            idempotencyKey: 'conc-1',
          }),
        request(app)
          .post('/api/orders')
          .set('Authorization', `Bearer ${customerToken}`)
          .send({
            items: [{ product: product._id, qty: 3 }],
            shippingAddress: sampleAddress,
            paymentMethod: 'cod',
            idempotencyKey: 'conc-2',
          }),
      ])

      const statuses = [r1.status, r2.status].sort()
      expect(statuses).toEqual([201, 400])
      expect((await Product.findById(product._id)).stock).toBe(2)
    })

    test('admin status transitions, single stock restore, customer isolation, and dashboard stats', async () => {
      const { customer, customerToken, adminToken } = await createCustomerAndAdmin()
      const product = await Product.create({
        name: 'Pendant Light',
        category: 'lighting',
        price: 150,
        stock: 4,
        inStock: true,
      })

      const o1 = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          items: [{ product: product._id, qty: 2 }],
          shippingAddress: sampleAddress,
          paymentMethod: 'cod',
          idempotencyKey: 'adm-1',
        })
      expect(o1.status).toBe(201)
      expect((await Product.findById(product._id)).stock).toBe(2)

      // Cancel once -> stock restored to 4
      const cancel1 = await request(app)
        .put(`/api/orders/${o1.body._id}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'cancelled' })
      expect(cancel1.status).toBe(200)
      expect((await Product.findById(product._id)).stock).toBe(4)

      // Cancel twice -> stock remains 4
      const cancel2 = await request(app)
        .put(`/api/orders/${o1.body._id}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'cancelled' })
      expect(cancel2.status).toBe(200)
      expect((await Product.findById(product._id)).stock).toBe(4)

      // Reopen cancelled -> 400
      const reopen = await request(app)
        .put(`/api/orders/${o1.body._id}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'processing' })
      expect(reopen.status).toBe(400)

      // Delivered order cannot be cancelled -> 400
      const deliveredOrder = await Order.create({
        user: customer._id,
        items: [{ product: product._id, name: product.name, price: 150, qty: 1 }],
        shippingAddress: sampleAddress,
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        subtotal: 150,
        shippingCost: 0,
        total: 150,
        status: 'delivered',
      })
      const cancelDelivered = await request(app)
        .put(`/api/orders/${deliveredOrder._id}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'cancelled' })
      expect(cancelDelivered.status).toBe(400)

      // Customer isolation: create another user's order and ensure /my only returns customer's orders
      await Order.create({
        user: new mongoose.Types.ObjectId(),
        items: [{ product: product._id, name: product.name, price: 150, qty: 1 }],
        shippingAddress: sampleAddress,
        paymentMethod: 'card',
        paymentStatus: 'paid',
        subtotal: 150,
        shippingCost: 0,
        total: 150,
        status: 'processing',
      })
      const myOrders = await request(app)
        .get('/api/orders/my')
        .set('Authorization', `Bearer ${customerToken}`)
      expect(myOrders.status).toBe(200)
      expect(myOrders.body).toHaveLength(2)

      // Stats exclude cancelled ($300) and separate paid ($150) vs pending COD ($150)
      const statsRes = await request(app)
        .get('/api/orders/stats')
        .set('Authorization', `Bearer ${adminToken}`)
      expect(statsRes.status).toBe(200)
      expect(statsRes.body.totalRevenue).toBe(300)
      expect(statsRes.body.paidRevenue).toBe(150)
      expect(statsRes.body.pendingCodRevenue).toBe(150)
    })
  })
})
