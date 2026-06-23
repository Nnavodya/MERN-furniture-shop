import React, { createContext, useState, useEffect, useContext } from 'react'

export const WishlistContext = createContext()

// Convenience hook — other files: const { wishlist, toggleWishlist } = useWishlist()
export const useWishlist = () => useContext(WishlistContext)

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])

  // ── Load wishlist from localStorage on first mount ──
  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      try {
        setWishlist(JSON.parse(saved))
      } catch (err) {
        console.error('Failed to load wishlist from localStorage:', err)
      }
    }
  }, [])

  // ── Persist wishlist whenever it changes ──
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const wishlistCount = wishlist.length

  const isWishlisted = (productId) => wishlist.some(item => item.id === productId)

  // ── Toggle a product in/out of the wishlist ──
  const toggleWishlist = (product) => {
    setWishlist(prev =>
      prev.some(item => item.id === product.id)
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product]
    )
  }

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
  }

  const clearWishlist = () => setWishlist([])

  return (
    <WishlistContext.Provider value={{
      wishlist,
      wishlistCount,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  )
}