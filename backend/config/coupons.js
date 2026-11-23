const COUPONS = {
  FURNI20:   { code: 'FURNI20',   discountPercent: 20 },
  WELCOME10: { code: 'WELCOME10', discountPercent: 10 },
}

const validateAndCalcCoupon = (rawCode, subtotal) => {
  if (rawCode === undefined || rawCode === null || String(rawCode).trim() === '') {
    return { couponCode: null, discountPercent: 0, discountAmount: 0 }
  }
  if (typeof rawCode !== 'string') {
    return { error: 'Invalid coupon code' }
  }

  const normalized = rawCode.trim().toUpperCase()
  const coupon = COUPONS[normalized]
  if (!coupon) {
    return { error: 'Invalid coupon code' }
  }

  const discountAmount = Math.round((subtotal * coupon.discountPercent) / 100)
  return {
    couponCode:      coupon.code,
    discountPercent: coupon.discountPercent,
    discountAmount,
  }
}

module.exports = { COUPONS, validateAndCalcCoupon }
