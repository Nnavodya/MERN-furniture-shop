import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Products from '../pages/Products'
import MyOrders from '../pages/MyOrders'
import CartContents from '../components/cart/CartContents'
import { CartProvider, useCart } from '../context/CartContext'
import { WishlistProvider } from '../context/WishlistContext'
import { AuthContext } from '../context/AuthContext'
import api from '../api/axios'

vi.mock('../api/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

describe('Products, Cart Limits, and MyOrders Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  test('Products displays out-of-stock state and disables Add button', async () => {
    api.get.mockResolvedValueOnce({
      data: [
        { _id: 'p1', name: 'Accent Mirror', category: 'decor', price: 449, stock: 0, inStock: false, rating: 4.3, reviews: 10 },
      ],
    })

    render(
      <MemoryRouter>
        <CartProvider>
          <WishlistProvider>
            <Products />
          </WishlistProvider>
        </CartProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Accent Mirror')).toBeInTheDocument()
    })
    expect(screen.getByText('Out of stock')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sold Out/i })).toBeDisabled()
  })

  test('Cart enforces stock quantity limits', () => {
    const Harness = () => {
      const { cartItems, cartMessage, addToCart, updateQty } = useCart()
      return (
        <div>
          <button onClick={() => addToCart({ id: 'p1', name: 'Lamp', price: 50, stock: 2, inStock: true })}>
            Add Lamp
          </button>
          {cartMessage && <p role="status">{cartMessage}</p>}
          <CartContents items={cartItems} onUpdateQty={updateQty} onRemove={() => {}} />
        </div>
      )
    }

    render(
      <MemoryRouter>
        <CartProvider>
          <Harness />
        </CartProvider>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Add Lamp' }))
    expect(screen.getByText('Lamp')).toBeInTheDocument()

    const allButtons = screen.getAllByRole('button')
    // [0]=Add Lamp, [1]=minus, [2]=plus
    const plusBtn = allButtons[2]
    fireEvent.click(plusBtn)
    expect(plusBtn).toBeDisabled()
  })

  test('MyOrders displays payment status badge and coupon discount', async () => {
    api.get.mockResolvedValueOnce({
      data: [
        {
          _id: '507f1f77bcf86cd799439099',
          createdAt: '2026-11-20T10:00:00.000Z',
          status: 'processing',
          paymentMethod: 'cod',
          paymentStatus: 'pending',
          subtotal: 200,
          couponCode: 'FURNI20',
          discountAmount: 40,
          shippingCost: 0,
          total: 160,
          items: [{ name: 'Oak Chair', qty: 2, price: 100 }],
          shippingAddress: { fullName: 'Alice', address: '123 St', city: 'Colombo', postalCode: '00100', country: 'SL' },
        },
      ],
    })

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuthenticated: true, loading: false, user: { name: 'Alice' } }}>
          <MyOrders />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('#439099')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('#439099'))
    expect(screen.getByText(/Discount \(FURNI20\)/i)).toBeInTheDocument()
    expect(screen.getByText('pending')).toBeInTheDocument()
  })
})
