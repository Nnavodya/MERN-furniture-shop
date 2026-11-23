import { useState, useRef, useEffect, Fragment } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  TbTruck, TbCreditCard, TbCheck, TbChevronLeft,
  TbLock, TbMapPin, TbArrowRight, TbCircleCheck, TbTag,
} from 'react-icons/tb'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

const C = {
  bg:           '#FAF7F4',
  card:         '#FFFFFF',
  accent:       '#8B5E2E',
  accentLight:  'rgba(139,94,46,0.08)',
  accentBorder: 'rgba(139,94,46,0.18)',
  text:         '#2C1A0E',
  textMuted:    'rgba(44,26,14,0.55)',
  divider:      'rgba(139,94,46,0.12)',
}

const steps = [
  { key: 'shipping', label: 'Shipping',  icon: TbTruck      },
  { key: 'payment',  label: 'Payment',   icon: TbCreditCard },
  { key: 'review',   label: 'Review',    icon: TbCheck      },
]

// ── Step indicator ──────────────────────────────────────
const StepIndicator = ({ current }) => {
  const currentIdx = steps.findIndex(s => s.key === current)
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, i) => {
        const done   = i < currentIdx
        const active = i === currentIdx
        return (
          <Fragment key={step.key}>
            <div className="flex items-center gap-2">
              <div
                className="flex items-center justify-center rounded-full shrink-0 transition-all"
                style={{
                  width: '36px', height: '36px',
                  background: done || active ? C.accent : C.card,
                  border: `1.5px solid ${done || active ? C.accent : C.divider}`,
                  color: done || active ? '#FFFFFF' : C.textMuted,
                }}
              >
                {done ? <TbCheck className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
              </div>
              <span
                className="text-sm font-semibold hidden sm:inline"
                style={{ color: done || active ? C.text : C.textMuted }}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="h-px w-8 sm:w-16"
                style={{ background: done ? C.accent : C.divider }}
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

// ── Reusable form field ─────────────────────────────────
const Field = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold" style={{ color: C.text }}>{label}</label>
    <input
      {...props}
      className="px-3 py-2.5 rounded-lg text-sm outline-none"
      style={{ border: `1px solid ${C.accentBorder}`, background: C.card, color: C.text }}
    />
  </div>
)

// ── Order summary sidebar ───────────────────────────────
const OrderSummary = ({
  cartItems,
  couponCode,
  discountAmt,
  discountPct,
  shippingCost,
  couponInput,
  setCouponInput,
  couponMsg,
  couponError,
  applyingCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  buttonLabel,
  onButtonClick,
  buttonDisabled,
}) => {
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const total    = subtotal - discountAmt + shippingCost

  return (
    <div
      className="rounded-xl p-5 sticky top-24"
      style={{ background: C.card, border: `1px solid ${C.divider}` }}
    >
      <h2 className="text-base font-bold mb-4" style={{ color: C.text }}>Order Summary</h2>

      <div className="flex flex-col gap-3 mb-4 max-h-64 overflow-y-auto">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0"
              style={{ background: C.accentLight }}
            >
              {item.emoji || '🪑'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: C.text }}>{item.name}</p>
              <p className="text-xs" style={{ color: C.textMuted }}>Qty {item.qty}</p>
            </div>
            <p className="text-xs font-bold shrink-0" style={{ color: C.accent }}>
              ${(item.price * item.qty).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Coupon input */}
      <div className="mb-4 pt-3" style={{ borderTop: `1px solid ${C.divider}` }}>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ border: `1px solid ${C.accentBorder}`, background: C.accentLight }}
        >
          <TbTag className="h-4 w-4 shrink-0" style={{ color: C.accent }} />
          <input
            type="text"
            placeholder="Coupon code (FURNI20)"
            value={couponInput}
            onChange={e => setCouponInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), onApplyCoupon())}
            className="bg-transparent border-none outline-none text-xs flex-1"
            style={{ color: C.text }}
          />
          <button
            type="button"
            onClick={onApplyCoupon}
            disabled={applyingCoupon}
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ color: C.accent, opacity: applyingCoupon ? 0.6 : 1 }}
          >
            {applyingCoupon ? '…' : 'Apply'}
          </button>
          {couponCode && (
            <button
              type="button"
              onClick={onRemoveCoupon}
              className="text-[11px] font-medium px-1"
              style={{ color: '#E53935' }}
            >
              Remove
            </button>
          )}
        </div>
        {(couponError || couponMsg) && (
          <p className="text-xs px-1 mt-1" style={{ color: couponError ? '#E53935' : '#2E7D32' }}>
            {couponError || couponMsg}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 mb-4 pt-3" style={{ borderTop: `1px solid ${C.divider}` }}>
        <div className="flex justify-between text-sm" style={{ color: C.textMuted }}>
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        {discountAmt > 0 && (
          <div className="flex justify-between text-sm" style={{ color: '#2E7D32' }}>
            <span>Discount ({couponCode} · {discountPct}%)</span>
            <span>−${discountAmt.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-sm" style={{ color: C.textMuted }}>
          <span>Shipping</span>
          <span style={{ color: shippingCost === 0 ? '#2E7D32' : C.textMuted }}>
            {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
          </span>
        </div>
        <div
          className="flex justify-between text-base font-bold pt-3"
          style={{ color: C.text, borderTop: `1px solid ${C.divider}` }}
        >
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={onButtonClick}
        disabled={buttonDisabled}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all"
        style={{
          background: buttonDisabled ? C.divider : C.accent,
          color: '#FFFFFF',
          cursor: buttonDisabled ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={e => { if (!buttonDisabled) e.currentTarget.style.background = '#7A5229' }}
        onMouseLeave={e => { if (!buttonDisabled) e.currentTarget.style.background = C.accent }}
      >
        {buttonLabel} <TbArrowRight className="h-4 w-4" />
      </button>

      <div className="flex items-center justify-center gap-2 pt-3 mt-3" style={{ borderTop: `1px solid ${C.divider}` }}>
        <TbLock className="h-3.5 w-3.5" style={{ color: C.textMuted }} />
        <p className="text-xs" style={{ color: C.textMuted }}>Secure checkout · SSL encrypted</p>
      </div>
    </div>
  )
}

// ── Main Checkout component ─────────────────────────────
const Checkout = () => {
  const { cartItems, clearCart, couponCode, setCouponCode, clearCoupon } = useCart()
  const { isAuthenticated, loading: authLoading } = useAuth()

  const [step, setStep] = useState('shipping')
  const [placing, setPlacing] = useState(false)
  const [placed, setPlaced]   = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState('')
  const [couponInput, setCouponInput]       = useState(couponCode || '')
  const [discountPct, setDiscountPct]       = useState(0)
  const [discountAmt, setDiscountAmt]       = useState(0)
  const [couponMsg, setCouponMsg]           = useState('')
  const [couponError, setCouponError]       = useState('')
  const [applyingCoupon, setApplyingCoupon] = useState(false)
  const idempotencyKeyRef = useRef(null)

  const [shipping, setShipping] = useState({
    fullName: '', email: '', phone: '',
    address: '', city: '', postalCode: '', country: 'Sri Lanka',
  })

  const [payment, setPayment] = useState({
    method: 'cod', cardNumber: '', expiry: '', cvc: '', nameOnCard: '',
  })

  useEffect(() => {
    let active = true
    if (!couponCode || cartItems.length === 0) {
      return () => { active = false }
    }
    api.post('/orders/validate-coupon', {
      code: couponCode,
      items: cartItems.map(i => ({ product: i.id, qty: i.qty })),
    })
      .then(({ data }) => {
        if (!active) return
        setDiscountPct(data.discountPercent)
        setDiscountAmt(data.discountAmount)
        setCouponMsg(`✓ ${data.discountPercent}% discount (${data.code}) applied`)
        setCouponError('')
      })
      .catch(() => {
        if (!active) return
        clearCoupon()
        setDiscountPct(0)
        setDiscountAmt(0)
      })
    return () => { active = false }
  }, [couponCode, cartItems, clearCoupon])

  const handleApplyCoupon = async () => {
    const trimmed = couponInput.trim()
    if (!trimmed) {
      clearCoupon()
      setDiscountPct(0)
      setDiscountAmt(0)
      setCouponMsg('')
      setCouponError('')
      return
    }
    setApplyingCoupon(true)
    setCouponError('')
    try {
      const { data } = await api.post('/orders/validate-coupon', {
        code: trimmed,
        items: cartItems.map(i => ({ product: i.id, qty: i.qty })),
      })
      setCouponCode(data.code)
      setCouponInput(data.code)
      setDiscountPct(data.discountPercent)
      setDiscountAmt(data.discountAmount)
      setCouponMsg(`✓ ${data.discountPercent}% discount (${data.code}) applied`)
    } catch (err) {
      clearCoupon()
      setDiscountPct(0)
      setDiscountAmt(0)
      setCouponMsg('')
      setCouponError(err.response?.data?.message || 'Invalid coupon code.')
    } finally {
      setApplyingCoupon(false)
    }
  }

  const handleRemoveCoupon = () => {
    clearCoupon()
    setCouponInput('')
    setDiscountPct(0)
    setDiscountAmt(0)
    setCouponMsg('')
    setCouponError('')
  }

  const subtotal     = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const shippingCost = subtotal - discountAmt >= 100 ? 0 : 25

  if (authLoading) {
    return (
      <div style={{ background: C.bg, minHeight: '100vh' }}>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-sm" style={{ color: C.textMuted }}>Loading checkout…</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />
  }

  // ── Empty cart guard ──
  if (cartItems.length === 0 && !placed) {
    return (
      <div style={{ background: C.bg, minHeight: '100vh' }}>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-2xl font-bold mb-2" style={{ color: C.text }}>Your cart is empty</p>
          <p className="text-sm mb-6" style={{ color: C.textMuted }}>
            Add a few things before checking out.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: C.accent, color: '#FFFFFF' }}
          >
            Browse Products <TbArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  // ── Order success screen ──
  if (placed) {
    return (
      <div style={{ background: C.bg, minHeight: '100vh' }}>
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center max-w-md">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
            style={{ background: 'rgba(46,125,50,0.1)' }}
          >
            <TbCircleCheck className="h-10 w-10" style={{ color: '#2E7D32' }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: C.text }}>
            Order placed successfully!
          </h1>
          <p className="text-sm mb-1" style={{ color: C.textMuted }}>
            Your order <span style={{ color: C.accent, fontWeight: 700 }}>#{orderNumber}</span> has been confirmed.
          </p>
          <p className="text-sm mb-8" style={{ color: C.textMuted }}>
            {emailSent
              ? `A confirmation email has been sent to ${shipping.email || 'your inbox'}.`
              : 'Your order is confirmed. You can track it anytime in My Orders.'}
          </p>
          <Link
            to="/products"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: C.accent, color: '#FFFFFF' }}
          >
            Continue Shopping <TbArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  const shippingValid = shipping.fullName && shipping.email && shipping.address && shipping.city && shipping.postalCode
  const paymentValid  = payment.method === 'cod'

  const handlePlaceOrder = async () => {
    if (placing) return
    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    }
    setError('')
    setPlacing(true)
    try {
      const { data } = await api.post('/orders', {
        items: cartItems.map(i => ({
          product:  i.id,
          name:     i.name,
          price:    i.price,
          qty:      i.qty,
          emoji:    i.emoji || '🪑',
        })),
        shippingAddress: shipping,
        paymentMethod:   'cod',
        ...(couponCode ? { couponCode } : {}),
        idempotencyKey:  idempotencyKeyRef.current,
      })
      setOrderNumber(data._id.toString().slice(-6).toUpperCase())
      setEmailSent(Boolean(data.confirmationEmailSent))
      setPlaced(true)
      clearCart()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: C.text }}>Checkout</h1>
        <StepIndicator current={step} />

        {error && (
          <div
            role="alert"
            className="max-w-5xl mx-auto mb-6 px-4 py-3 rounded-xl text-sm"
            style={{ background: 'rgba(229,57,53,0.08)', color: '#C62828', border: '1px solid rgba(229,57,53,0.2)' }}
          >
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {/* ── Main form area ── */}
          <div className="lg:col-span-2">

            {/* STEP 1 — Shipping */}
            {step === 'shipping' && (
              <div className="rounded-xl p-6" style={{ background: C.card, border: `1px solid ${C.divider}` }}>
                <div className="flex items-center gap-2 mb-5">
                  <TbMapPin className="h-5 w-5" style={{ color: C.accent }} />
                  <h2 className="text-lg font-bold" style={{ color: C.text }}>Shipping Address</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Field
                    label="Full Name" placeholder="Nethmi Rajapaksha"
                    value={shipping.fullName}
                    onChange={e => setShipping({ ...shipping, fullName: e.target.value })}
                  />
                  <Field
                    label="Email" type="email" placeholder="you@example.com"
                    value={shipping.email}
                    onChange={e => setShipping({ ...shipping, email: e.target.value })}
                  />
                </div>

                <div className="mb-4">
                  <Field
                    label="Phone Number" placeholder="+94 71 234 5678"
                    value={shipping.phone}
                    onChange={e => setShipping({ ...shipping, phone: e.target.value })}
                  />
                </div>

                <div className="mb-4">
                  <Field
                    label="Street Address" placeholder="123 Main Street"
                    value={shipping.address}
                    onChange={e => setShipping({ ...shipping, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <Field
                    label="City" placeholder="Colombo"
                    value={shipping.city}
                    onChange={e => setShipping({ ...shipping, city: e.target.value })}
                  />
                  <Field
                    label="Postal Code" placeholder="00100"
                    value={shipping.postalCode}
                    onChange={e => setShipping({ ...shipping, postalCode: e.target.value })}
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold" style={{ color: C.text }}>Country</label>
                    <select
                      value={shipping.country}
                      onChange={e => setShipping({ ...shipping, country: e.target.value })}
                      className="px-3 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                      style={{ border: `1px solid ${C.accentBorder}`, background: C.card, color: C.text }}
                    >
                      <option>Sri Lanka</option>
                      <option>India</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  disabled={!shippingValid}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: shippingValid ? C.accent : C.divider,
                    color: '#FFFFFF',
                    cursor: shippingValid ? 'pointer' : 'not-allowed',
                  }}
                >
                  Continue to Payment <TbArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* STEP 2 — Payment */}
            {step === 'payment' && (
              <div className="rounded-xl p-6" style={{ background: C.card, border: `1px solid ${C.divider}` }}>
                <div className="flex items-center gap-2 mb-5">
                  <TbCreditCard className="h-5 w-5" style={{ color: C.accent }} />
                  <h2 className="text-lg font-bold" style={{ color: C.text }}>Payment Method</h2>
                </div>

                {/* Method selector */}
                <div className="flex gap-3 mb-5">
                  <button
                    type="button"
                    onClick={() => setPayment({ ...payment, method: 'cod' })}
                    className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: C.accent,
                      color: '#FFFFFF',
                      border: `1px solid ${C.accent}`,
                    }}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
                    style={{
                      background: C.divider,
                      color: C.textMuted,
                      border: `1px solid ${C.divider}`,
                      cursor: 'not-allowed',
                      opacity: 0.75,
                    }}
                  >
                    Credit / Debit Card
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(44,26,14,0.1)', color: C.textMuted }}>
                      Currently Unavailable
                    </span>
                  </button>
                </div>

                <div
                  className="mb-6 p-4 rounded-lg text-sm"
                  style={{ background: C.accentLight, color: C.textMuted, border: `1px solid ${C.accentBorder}` }}
                >
                  You'll pay in cash when your order is delivered. Please have the exact amount ready.
                  <span className="block text-xs mt-2">
                    Card payments are currently unavailable.
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('shipping')}
                    className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: C.accentLight, color: C.accent, border: `1px solid ${C.accentBorder}` }}
                  >
                    <TbChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep('review')}
                    disabled={!paymentValid}
                    className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: paymentValid ? C.accent : C.divider,
                      color: '#FFFFFF',
                      cursor: paymentValid ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Review Order <TbArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — Review */}
            {step === 'review' && (
              <div className="rounded-xl p-6" style={{ background: C.card, border: `1px solid ${C.divider}` }}>
                <div className="flex items-center gap-2 mb-5">
                  <TbCheck className="h-5 w-5" style={{ color: C.accent }} />
                  <h2 className="text-lg font-bold" style={{ color: C.text }}>Review Your Order</h2>
                </div>

                {/* Shipping summary */}
                <div className="mb-5 p-4 rounded-lg" style={{ background: C.accentLight }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold uppercase" style={{ color: C.accent }}>Shipping To</p>
                    <button onClick={() => setStep('shipping')} className="text-xs font-medium" style={{ color: C.accent }}>
                      Edit
                    </button>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: C.text }}>{shipping.fullName}</p>
                  <p className="text-sm" style={{ color: C.textMuted }}>
                    {shipping.address}, {shipping.city} {shipping.postalCode}, {shipping.country}
                  </p>
                  <p className="text-sm" style={{ color: C.textMuted }}>{shipping.email} · {shipping.phone}</p>
                </div>

                {/* Payment summary */}
                <div className="mb-6 p-4 rounded-lg" style={{ background: C.accentLight }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold uppercase" style={{ color: C.accent }}>Payment Method</p>
                    <button onClick={() => setStep('payment')} className="text-xs font-medium" style={{ color: C.accent }}>
                      Edit
                    </button>
                  </div>
                  <p className="text-sm" style={{ color: C.text }}>
                    {payment.method === 'card'
                      ? `Card ending in ${payment.cardNumber.slice(-4) || '••••'}`
                      : 'Cash on Delivery'}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('payment')}
                    className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: C.accentLight, color: C.accent, border: `1px solid ${C.accentBorder}` }}
                  >
                    <TbChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: C.accent, color: '#FFFFFF', opacity: placing ? 0.7 : 1 }}
                  >
                    {placing ? 'Placing Order…' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Order summary sidebar ── */}
          <div>
            <OrderSummary
              cartItems={cartItems}
              couponCode={couponCode}
              discountAmt={discountAmt}
              discountPct={discountPct}
              shippingCost={shippingCost}
              couponInput={couponInput}
              setCouponInput={setCouponInput}
              couponMsg={couponMsg}
              couponError={couponError}
              applyingCoupon={applyingCoupon}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              buttonLabel={
                step === 'shipping' ? 'Continue to Payment' :
                step === 'payment'  ? 'Review Order' :
                placing ? 'Placing Order…' : 'Place Order'
              }
              buttonDisabled={
                (step === 'shipping' && !shippingValid) ||
                (step === 'payment'  && !paymentValid) ||
                placing
              }
              onButtonClick={
                step === 'shipping' ? () => setStep('payment') :
                step === 'payment'  ? () => setStep('review')  :
                handlePlaceOrder
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;