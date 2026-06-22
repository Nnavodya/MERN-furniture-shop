import React, { createContext, useState, useEffect, useContext } from 'react'

export const CartContext = createContext()

// Convenience hook — other files: const { cartItems, addToCart } = useCart()
export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

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
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        )
      }
      return [...prev, { ...product, qty }]
    })
  }

  // ── Remove an item completely ──
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  // ── Update qty by a delta (e.g. +1 / -1), minimum 1 ──
  const updateQty = (productId, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    )
  }

  // ── Set qty to an exact value (e.g. typed into an input) ──
  const setQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(prev =>
        prev.map(item => item.id === productId ? { ...item, qty } : item)
      )
    }
  }

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
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