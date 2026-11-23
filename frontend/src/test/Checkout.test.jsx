import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Checkout from '../pages/Checkout'
import { AuthContext } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import api from '../api/axios'

vi.mock('../api/axios', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}))

const renderCheckout = () => {
  localStorage.setItem(
    'cart',
    JSON.stringify([{ id: '507f1f77bcf86cd799439011', name: 'Oak Chair', price: 100, qty: 1, stock: 5 }])
  )
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={{ isAuthenticated: true, loading: false, user: { name: 'Alice' } }}>
        <CartProvider>
          <Checkout />
        </CartProvider>
      </AuthContext.Provider>
    </MemoryRouter>
  )
}

describe('Checkout Page Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  test('displays COD active and Card Payment as Currently Unavailable', async () => {
    renderCheckout()

    fireEvent.change(screen.getByPlaceholderText('Nethmi Rajapaksha'), { target: { value: 'Alice' } })
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'alice@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('123 Main Street'), { target: { value: '123 Main St' } })
    fireEvent.change(screen.getByPlaceholderText('Colombo'), { target: { value: 'Colombo' } })
    fireEvent.change(screen.getByPlaceholderText('00100'), { target: { value: '00100' } })

    fireEvent.click(screen.getAllByRole('button', { name: /Continue to Payment/i })[0])

    expect(screen.getByRole('button', { name: /Cash on Delivery/i })).toBeEnabled()
    const cardBtn = screen.getByRole('button', { name: /Credit \/ Debit Card/i })
    expect(cardBtn).toBeDisabled()
    expect(screen.getAllByText(/Currently Unavailable/i).length).toBeGreaterThanOrEqual(1)
  })

  test('validates FURNI20 coupon and shows error for invalid coupon', async () => {
    api.post.mockImplementation(async (_url, body) => {
      if (body?.code === 'FURNI20') {
        return { data: { valid: true, code: 'FURNI20', discountPercent: 20, discountAmount: 20 } }
      }
      throw { response: { data: { message: 'Invalid coupon code' } } }
    })

    renderCheckout()

    const input = screen.getByPlaceholderText(/Coupon code/i)
    fireEvent.change(input, { target: { value: 'FURNI20' } })
    fireEvent.click(screen.getByRole('button', { name: /^Apply$/i }))

    await waitFor(() => {
      expect(screen.getByText(/20% discount \(FURNI20\) applied/i)).toBeInTheDocument()
    })

    fireEvent.change(input, { target: { value: 'BADCODE' } })
    fireEvent.click(screen.getByRole('button', { name: /^Apply$/i }))

    await waitFor(() => {
      expect(screen.getByText(/Invalid coupon code/i)).toBeInTheDocument()
    })
  })
})
