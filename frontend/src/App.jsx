// v4: Added cart functions — addToCart, updateQty, removeItem
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from "./components/layout/UserLayout";
import Header from './components/common/Header'
import CartDrawer from './components/layout/CartDrawer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  const [cartOpen,      setCartOpen]      = useState(false)
  const [cartItems,     setCartItems]     = useState([])
  const [wishlistCount, setWishlistCount] = useState(0)

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  // Add item to cart — if exists increase qty, else add new
  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }

  // Increase or decrease item quantity (min 1)
  const updateQty = (id, delta) => {
    setCartItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    )
  }

  // Remove item from cart by id
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <BrowserRouter>
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={() => setCartOpen(true)}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />

      <main className="min-h-screen" style={{ background: '#FAF7F4' }}>
        <Routes>
          <Route path="/user"         element={<UserLayout />}     />
          <Route path="/"             element={<Home />}           />
          <Route path="/products"     element={<Products />}       />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart"         element={<Cart />}           />
          <Route path="/checkout"     element={<Checkout />}       />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;