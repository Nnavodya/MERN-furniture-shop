import React, { createContext, useState, useEffect, useContext, useRef } from 'react'

export const CartContext = createContext()

// Convenience hook — other files: const { cartItems, addToCart } = useCart()
export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartMessage, setCartMessage] = useState('')
  const lastAddedRef = useRef({ id: null, at: 0 })

  // ── Load cart from localStorage on first mount ──
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        setCartItems(JSON.parse(saved))
      } catch (err) {
        console.error('Failed to load cart from localStorage:', err)
      }
    }
  }, [])

  // ── Persist cart to localStorage whenever it changes ──
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // ── Derived cart count (sum of all qty) — used by Header badge ──
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  // ── Add product to cart (or bump qty if it already exists) ──
  const addToCart = (product, qty = 1) => {
    const now = Date.now()
    if (lastAddedRef.current.id === product.id && now - lastAddedRef.current.at < 700) {
      return
    }
    lastAddedRef.current = { id: product.id, at: now }

    const maxStock = typeof product.stock === 'number' ? product.stock : null
    if (product.inStock === false || (maxStock !== null && maxStock <= 0)) {
      setCartMessage(`${product.name} is out of stock`)
      window.setTimeout(() => setCartMessage(''), 2000)
      return
    }

    const existing = cartItems.find(item => item.id === product.id)
    const currentQty = existing ? existing.qty : 0
    if (maxStock !== null && currentQty + qty > maxStock) {
      setCartMessage(`Only ${maxStock} left in stock for ${product.name}`)
      window.setTimeout(() => setCartMessage(''), 2000)
      return
    }

    setCartItems(prev => {
      const found = prev.find(item => item.id === product.id)
      if (found) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + qty, ...(maxStock !== null ? { stock: maxStock } : {}) }
            : item
        )
      }
      return [...prev, { ...product, qty }]
    })
    setCartMessage(`${product.name} added to cart`)
    window.setTimeout(() => setCartMessage(''), 2000)
  }

  // ── Remove an item completely ──
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  // ── Update qty by a delta (e.g. +1 / -1), minimum 1, capped at available stock ──
  const updateQty = (productId, delta) => {
    const target = cartItems.find(item => item.id === productId)
    if (delta > 0 && target && typeof target.stock === 'number' && target.qty + delta > target.stock) {
      setCartMessage(`Only ${target.stock} left in stock`)
      window.setTimeout(() => setCartMessage(''), 2000)
      return
    }
    setCartItems(prev =>
      prev.map(item => {
        if (item.id !== productId) return item
        const nextQty = Math.max(1, item.qty + delta)
        const capped = typeof item.stock === 'number' ? Math.min(nextQty, Math.max(1, item.stock)) : nextQty
        return { ...item, qty: capped }
      })
    )
  }

  // ── Set qty to an exact value (e.g. typed into an input) ──
  const setQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(prev =>
        prev.map(item => {
          if (item.id !== productId) return item
          const capped = typeof item.stock === 'number' ? Math.min(qty, Math.max(1, item.stock)) : qty
          return { ...item, qty: capped }
        })
      )
    }
  }

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartMessage,
      addToCart,
      removeFromCart,
      updateQty,
      setQty,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}