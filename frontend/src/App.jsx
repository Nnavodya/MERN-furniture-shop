// v2: Added cart count state and wishlist state
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from "./components/layout/UserLayout";
import Header from './components/common/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  const [cartItems,     setCartItems]     = useState([])
  const [wishlistCount, setWishlistCount] = useState(0)

  // Total cart item count derived from cartItems
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  return (
    <BrowserRouter>
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
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